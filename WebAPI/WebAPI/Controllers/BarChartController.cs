﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarChartController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BarChartController(IConfiguration configuration)
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