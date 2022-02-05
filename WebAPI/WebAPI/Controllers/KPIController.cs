using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KPIController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public KPIController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("files/{id:int}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var filePath = $"{id}.txt";

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, "text/plain", Path.GetFileName(filePath));
        }
    }
}
