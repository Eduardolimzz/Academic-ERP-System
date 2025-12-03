using Microsoft.AspNetCore.Mvc;

namespace SmartSchool_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlunoController : ControllerBase
    {
         [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok("");
                
            } catch (System.Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
            
        }
        
    }
}