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



namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class FileController : ControllerBase
    {   
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
                 var folderName = Path.Combine("WebAPI","WebAPI","Resources", "Images");

                var savePath = Path.Combine(projectParentDirectory, folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(savePath, fileName);
                    var imagePath= Path.Combine( "Resources", "Images", fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
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
        [HttpGet, DisableRequestSizeLimit]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string fileUrl)
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
        public IActionResult CreateZIP()
        {
                var path =Path.Combine("Resources");
            //var folderName = Path.Combine(projectParentDirectory+"WebApp", "src", "assets", "Resources", "Dashboard");
            var folderName = Path.Combine("Resources","Dashboard");
            
            var zipPath = path + "\\Dashboard.zip";
            var files = Directory.EnumerateFiles(path);
            //Checking if zip file for generated dashboard code has already been created.
            if (files.Count() == 0)
            {
                ZipFile.CreateFromDirectory(
                    folderName,
                     zipPath, includeBaseDirectory: true,
                      compressionLevel: CompressionLevel.Optimal);
            }
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
