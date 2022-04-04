﻿using Microsoft.AspNetCore.Cors;
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
                var user_id = formCollection["user_id"];
                Console.WriteLine("user id: "+user_id);
                //Path to WebApp assets 
                // var folderName = Path.Combine("WebApp","src","assets","Resources", "Images");
                // var folderName = Path.Combine("WebAPI","WebAPI","Resources", "Images");

                //deleting unneeded user data
              //  deleteUserData(user_id);
                //Creating input and output folders for each user
                var inputFolderName = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API", "ImageInput",user_id);
                var outputFolderName = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API", "Output", user_id);

                //      var folderName = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API", "ImageInput");
                Console.WriteLine("input folderName for user: "+inputFolderName);
                if (!Directory.Exists(inputFolderName))
                {
                    Directory.CreateDirectory(inputFolderName);
                }
                Console.WriteLine("output folderName for user: " + outputFolderName);
                if (!Directory.Exists(outputFolderName))
                {
                    Directory.CreateDirectory(outputFolderName);
                }
                // var savePath = Path.Combine(projectParentDirectory, folderName);
                var savePath = Path.Combine(projectParentDirectory, inputFolderName);

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

                    runImageRecognition(user_id);
                    //Deleting user input folders after use
                    if (Directory.Exists(inputFolderName))
                    {
                        Directory.Delete(inputFolderName);
                    }
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
        public IActionResult runImageRecognition(string user_id) {
            string fileName= Path.Combine(projectParentDirectory,"WebAPI","Image_Recognition_API","read.py");
            Console.WriteLine(fileName);

            string workingDirectory = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API");
           
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
            string pythonExecutable = pythonExePath[0]+"python.exe";
            Console.WriteLine("python exe path: "+pythonExecutable);

            //Hard coded python.exe path, would have to be changed on each machine used
            // string pythonExecutable = "C:\\Python\\python.exe";

            //Calling Python image recognition script   
            Process p = new Process();
            start = new ProcessStartInfo();
            start.FileName = pythonExecutable;// full path to python.exe
          
            start.Arguments = fileName+" "+user_id;// is path to .py file and any cmd line args
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

            runCodeGeneration(user_id);
            return Ok();
        }

        [HttpGet]
        [Route("codeGeneration")]
        public IActionResult runCodeGeneration(string user_id)
        {
            //Creating user code folder 
            var codeFolderName = Path.Combine(projectParentDirectory, "WebAPI", "Code-Generation-API", "Generation_Enviroment", "src", "app", user_id, "Web_Dashboard");
            if (Directory.Exists(codeFolderName))
            {
          
                Directory.Delete(codeFolderName, true);
            }
            Directory.CreateDirectory(codeFolderName);

            var outputFolderName = Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API", "Output", user_id,"output.txt");
            string[] fileComponents = System.IO.File.ReadAllLines(outputFolderName);
            Console.WriteLine("User output file contents:");
            int componentCount = 0;
            string userComponemtFolder=user_id;
            string projectFolder = Path.Combine(projectParentDirectory, "WebAPI", "Code-Generation-API", "Generation_Enviroment");



            //Run schematic to create dashboard template
            string command = "ng g @schematics/code-builder:dashboard \"" + user_id + "\\Web_Dashboard\\dashboard\"";
            ProcessStartInfo start = new ProcessStartInfo();
            Console.WriteLine("command: " + command);
            start.FileName = "cmd.exe";
            start.Verb = "runas";
            start.Arguments = "/C " + command;
            start.RedirectStandardOutput = true;
            start.UseShellExecute = false;
            start.WorkingDirectory = projectFolder;
            var cmd = Process.Start(start);
            string output = cmd.StandardOutput.ReadToEnd();
            cmd.WaitForExit();
            string[] dashboardSlots = new string[6] { "0", "0", "0", "0", "0", "0" };
            bool slotConflict;
            //Run schematic for each component
            foreach (string component in fileComponents) { 
                Console.WriteLine(component);
               string[] lineValues = component.Split(" ");
                 start = new ProcessStartInfo();
                 command="";
                //Preventing conflicting dashboard slot assignment for components. TODO: add slot reassignment
                slotConflict = false;
                for (int i = 0; i < componentCount && i < 6; i++)
                {
                    Console.WriteLine("Compare 1:" + lineValues[1] + lineValues[2]);
                    Console.WriteLine("Compare 2: " + dashboardSlots[i]);
                    if (dashboardSlots[i].Equals(lineValues[1] + lineValues[2]))
                    {
                        Console.WriteLine("hit");
                        slotConflict = true;
                        break;
                    }
                     
                }
                if (componentCount < 6&&slotConflict==false)
                {
                    dashboardSlots[componentCount] = lineValues[1] + lineValues[2];
                    Console.WriteLine("dasboard slots:" + dashboardSlots[componentCount]);
                    switch (lineValues[0])
                    {
                        case "B":
                            command = "ng g @schematics/code-builder:bar-chart --name=\"" + user_id + "/Web_Dashboard/bar-chart" + ++componentCount + "\" --row=\"" + lineValues[1] + "\" --col=\"" + lineValues[2] + "\"";
                            break;
                        case "N":
                            command = "ng g @schematics/code-builder:kpi --name=\"" + user_id + "/Web_Dashboard/kpi" + ++componentCount + "\" --row=\"" + lineValues[1] + "\" --col=\"" + lineValues[2] + "\"";
                            break;
                        case "G":
                            command = "ng g @schematics/code-builder:data-grid --name=\"" + user_id + "/Web_Dashboard/data-grid" + ++componentCount + "\" --row=\"" + lineValues[1] + "\" --col=\"" + lineValues[2] + "\"";
                            break;
                        default:
                            break;

                    }
                    Console.WriteLine("command: " + command);
                    start.FileName = "cmd.exe";
                    start.Verb = "runas";
                    start.Arguments = "/C " + command;
                    start.RedirectStandardOutput = true;
                    start.UseShellExecute = false;
                    start.WorkingDirectory = projectFolder;
                    cmd = Process.Start(start);
                    output = cmd.StandardOutput.ReadToEnd();
                    cmd.WaitForExit();
                }
                
                }
                
            //Deleting user output folder from image recognition script after use.
            if (Directory.Exists(outputFolderName))
            {
                Directory.Delete(outputFolderName);
            }
            return Ok();
        }

            [HttpGet, DisableRequestSizeLimit]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string fileUrl, [FromQuery] string user_id )
        {

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
        public IActionResult CreateZIP([FromQuery]string user_id)
        {
                var path =Path.Combine("Resources","Dashboard",user_id);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var folderName = Path.Combine(projectParentDirectory, "WebAPI", "Code-Generation-API", "src","app",user_id,"Web_Dashboard");

            var zipPath = path + "\\Web_Dashboard.zip";
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

        //TODO: call this from angular project on app or tab close to clear uneeded user data from webAPI
        [HttpGet, DisableRequestSizeLimit]
        [Route("deleteUserData")]
        public IActionResult deleteUserData([FromQuery] string user_id)
        {
           string dashboardPath= Path.Combine(projectParentDirectory, "WebAPI", "Code-Generation-API", "src", "app", user_id);
            string zipPath = Path.Combine("Resources", "Dashboard", user_id) + "\\Dashboard.zip";
            string outputFolder= Path.Combine(projectParentDirectory, "WebAPI", "Image_Recognition_API", "Output", user_id);
            if (Directory.Exists(dashboardPath))
            {
                Directory.Delete(dashboardPath);
            }
            if (Directory.Exists(zipPath))
            {
                Directory.Delete(zipPath);
            }
            if (Directory.Exists(outputFolder))
            {
                Directory.Delete(outputFolder);
            }

            return Ok();    
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
