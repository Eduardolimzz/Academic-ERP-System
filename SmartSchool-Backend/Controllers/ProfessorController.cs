using Microsoft.AspNetCore.Mvc;

namespace SmartSchool_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfessorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("ProfessorController is working!");
        }
        
    }
}