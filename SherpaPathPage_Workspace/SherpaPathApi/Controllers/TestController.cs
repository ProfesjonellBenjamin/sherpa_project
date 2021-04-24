using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SherpaPathApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [Authorize(Roles = "Admin")]
    public class TestController : ControllerBase 
    {
        [HttpGet]
        public IActionResult Test()
        {
            var user = HttpContext.User;
            return Ok("yes");
        }
    }
}