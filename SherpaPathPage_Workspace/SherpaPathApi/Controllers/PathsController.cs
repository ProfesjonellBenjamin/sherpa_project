using SherpaPathApi.Models;
using SherpaPathApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace SherpaPathApi.Controllers{

    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class PathsController : ControllerBase {

        private readonly PathsService _PathsService;

        public PathsController(PathsService PathsService){
            _PathsService = PathsService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<Path>> Get(){
            return _PathsService.Get();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<Path> Post(Path Path){
            _PathsService.Create( Path );
            return Path;
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(string id){
            var Path = _PathsService.Get( id );

            if( Path == null){
                return NotFound();
            }

            _PathsService.Remove( Path.Id );
            return NoContent();
        }

        [HttpPut("{id:length(24)}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Put(string id, Path PathIn){
            var selectedPath = _PathsService.Get( id );

            if( selectedPath == null){
                return NotFound();
            }

            _PathsService.Update( id, PathIn );

            return NoContent();
        }
        
        [HttpGet("find/{query}")]
        [AllowAnonymous]
        public ActionResult<List<Path>> Find(string query)
        {
            return _PathsService.Find(query);
        }
    }

}