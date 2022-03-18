using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.Net.Http.Headers;
using System;
using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;
using System.Linq;
using System.Diagnostics;



namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class FileController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        //Project parent directory path
        private string projectParentDirectory = Directory.GetParent((Directory.GetParent(Directory.GetCurrentDirectory()).ToString())).ToString();
        //Swap in commented out code to reroute file storage for download to angular assets folder, or vice versa for image upload.
        //add IFormFile fileInput parameter to upload function for testing in swaggerui
        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                //Asynchronous file reading 
                var formCollection = await Request.ReadFormAsync();
                   var file = formCollection.Files.First();
                //Path to WebApp assets 
                // var folderName = Path.Combine("WebApp","src","assets","Resources", "Images");
                // var folderName = Path.Combine("WebAPI","WebAPI","Resources", "Images");
                var folderName = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API", "ImageInput");

                var savePath = Path.Combine(projectParentDirectory, folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(savePath, fileName);
                    var imagePath= Path.Combine( "Resources", "Images", fileName);
                    var databasePath = "https://localhost:7112"+"/"+imagePath;
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    //adding image path to database in UserRequests Controller
                    //UserRequests userRequests = new UserRequests();
                    //userRequests.UploadedImagePath = savePath;
                    //UserRequestsController userRequestsController = new(_configuration);
                    //userRequestsController.addImage(databasePath);

                    runImageRecognition();
                    return Ok(new { imagePath});

                }
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex}");

            }
            return null;
        }

        [HttpGet]
        [Route("imageRecognition")]
        public IActionResult runImageRecognition() {
            string fileName= Path.Combine(projectParentDirectory,"WebAPI","Image_Recognition_API","read.py");
            Console.WriteLine(fileName);

            string workingDirectory = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API");

            // string pythonExecutable = Path.Combine(projectParentDirectory, "WebAPI", "WebAPI","python.exe");
            //string pythonExecutable = "C:\\Users\\mrnoe\\AppData\\Local\\Programs\\Python\\Python310";

            //Finding path to python.exe on local machine
           string command = "where python";
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = "cmd.exe";
            start.Verb = "runas";
            start.Arguments = "/C " + command;
            start.RedirectStandardOutput = true;
            start.UseShellExecute = false;
            var cmd = Process.Start(start);
            string output = cmd.StandardOutput.ReadToEnd();
            cmd.WaitForExit();
           var pythonExePath= output.Split("python.exe");
            Console.WriteLine("Python path output:"+pythonExePath[0]);
            string pythonExecutable = pythonExePath[0]+"python.exe";
            Console.WriteLine("python exe path: "+pythonExecutable);

            //Hard coded python.exe path, would have to be changed on each machine used
            // string pythonExecutable = "C:\\Python\\python.exe";

            //Callling Python image recognition script   
            Process p = new Process();
            start = new ProcessStartInfo();
            start.FileName = pythonExecutable;// full path to python.exe
          
            start.Arguments = fileName;// is path to .py file and any cmd line args
            start.UseShellExecute = false;
            start.WorkingDirectory = workingDirectory;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = "test";
                      result=  reader.ReadToEnd();
                    Console.Write(result);
                }
            }
                return Ok();
        }
        [HttpGet, DisableRequestSizeLimit]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string fileUrl)
        {

            //var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileUrl);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileUrl);

            if (!System.IO.File.Exists(filePath))
                return NotFound();
            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetFileType(filePath), filePath);
        }


        [HttpGet, DisableRequestSizeLimit]
        [Route("getFiles")]
        public IActionResult GetFiles([FromQuery] string path)
        {
            try
            {
                //TODO: elimate path parameter
                //var folderName = Path.Combine("WebApp","src","assets","Resources", "Dashboard");
                //var readPath = Path.Combine(projectParentDirectory, folderName);
                var readPath = Path.Combine(projectParentDirectory, "WebAPI","WebAPI","Resources","DashBoard");

                var files = Directory.EnumerateFiles(readPath);
                return Ok(new { files });
            }
            catch (Exception ex)
            { return StatusCode(500, $"Internal server error: {ex}"); }
        }
        [HttpGet, DisableRequestSizeLimit]
        [Route("createZIP")]
        public IActionResult CreateZIP()
        {
                var path =Path.Combine("Resources");
           // var folderName = Path.Combine(projectParentDirectory+"Image_Recognition_API", "s", "assets", "Resources", "Dashboard");
            var folderName = Path.Combine(projectParentDirectory ,"WebAPI", "Image_Recognition_API", "Output");
            //var folderName = Path.Combine("Resources","Dashboard");
            var zipPath = path + "\\Dashboard.zip";
            var files = Directory.EnumerateFiles(path);
            //Checking if zip file for generated dashboard code has already been created.
            if (files.Count() == 1)
            {
                System.IO.File.Delete(files.First());
            }
                ZipFile.CreateFromDirectory(
                    folderName,
                     zipPath, includeBaseDirectory: true,
                     
                      compressionLevel: CompressionLevel.Optimal);
            
            return Ok(new { zipPath});
        }
         [HttpGet, DisableRequestSizeLimit]
        [Route("getFolders")]
        public IActionResult GetFolders()
        {
            try
            {
                var folderName = Path.Combine("WebAPI","WebAPI","Resources","Dashboard");
                var readPath = Path.Combine(projectParentDirectory, folderName);
                var folders = Directory.EnumerateDirectories(readPath);
                return Ok(new { folders });
            }
            catch (Exception ex)
            { return StatusCode(500, $"Internal server error: {ex}"); }
        }

        private string GetFileType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string fileType;
            if (!provider.TryGetContentType(path, out fileType))
                fileType = "application/octet-stream";
            return fileType;
        }
    }
}
