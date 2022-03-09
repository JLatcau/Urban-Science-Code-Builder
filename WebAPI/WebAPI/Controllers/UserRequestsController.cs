using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]

    public class UserRequestsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserRequestsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select User_ID as ""User_ID"",
                                    UploadedImagePath as ""UploadedImagePath""
                             from UserRequests
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserRequestsAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(UserRequests requests)
        {
            string query = @"
                 insert into UserRequests(UploadedImagePath)
                 values (@UploadedImagePath)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserRequestsAppCon");
            if (sqlDataSource == null)
            {
                sqlDataSource = "Host=localhost;Database=postgres;Port=5432;User Id=postgres;Password=postgres";
            }
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UploadedImagePath", requests.UploadedImagePath);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(UserRequests requests)
        {
            string query = @"
                 update UserRequests
                 set UploadedImagePath = @UploadedImagePath
                 where User_ID = @User_ID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserRequestsAppCon");
            if (sqlDataSource == null)
            { 
                sqlDataSource= "Host=localhost;Database=postgres;Port=5432;User Id=postgres;Password=postgres";
            }
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@User_ID", requests.User_ID);
                    myCommand.Parameters.AddWithValue("@UploadedImagePath", requests.UploadedImagePath);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                 delete from UserRequests
                 where User_ID = @User_ID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("UserRequestsAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@User_ID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [HttpPost]
        [Route("addImage")]
        public  IActionResult addImage([FromQuery] string UploadedImagePath)
        {
            UserRequests userRequests = new UserRequests();
            userRequests.UploadedImagePath = UploadedImagePath;
            Post(userRequests);
            return Ok();
        }
    }
}
