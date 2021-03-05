using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections;
using System.Linq;
//IGNORÉR FORELØPIG

namespace GamesApi.Controllers {

    [ApiController]
    [Route("[controller]")]
    public class ImageUploadController : ControllerBase {

        private readonly IWebHostEnvironment _hosting;

        public ImageUploadController(IWebHostEnvironment hosting){

            _hosting = hosting;
        }

        [HttpGet]
        public IActionResult Get(){

            //https://stackoverflow.com/questions/55876639/displaying-images-from-wwwroot-folder

            // get the real path of wwwroot/imagesFolder
            string rootDir = _hosting.WebRootPath + "/images/";
            // the extensions allowed to show
            string[] filters = { ".jpg", ".jpeg", ".png", ".gif", ".tiff", ".bmp", ".svg" };
            // set the base url = "/"
            string baseUrl = "";            


            IEnumerable imgUrls = Directory.EnumerateFiles(rootDir,"*.*",SearchOption.AllDirectories)
            .Where( fileName => filters.Any(filter => fileName.EndsWith(filter)))
            .Select( fileName => Path.GetRelativePath( rootDir, fileName) ) // get relative path
            .Select ( fileName => Path.Combine(baseUrl, fileName))          // prepend the baseUrl
            .Select( fileName => fileName.Replace("\\","/"))                // replace "\" with "/"
            ;

            return new JsonResult(imgUrls);

        }

        [HttpPost]
        [Route("[action]")] //axios må gjøre kall til uploadImage
        public void UploadImage(IFormFile file){
            string wwwrootPath = _hosting.WebRootPath;
            string absolutepath = Path.Combine( $"{wwwrootPath}/images/{file.FileName}");
            //file.ContentType, Guid.getGuid() genererer random navn
            using (var fileStream = new FileStream(absolutepath, FileMode.Create)){
                file.CopyTo(fileStream);
            }
        }
    }


}
