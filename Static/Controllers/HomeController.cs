using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Static.Models;
using System.IO;

namespace Static.Controllers
{
    public class HomeController : Controller
    {
        private string GetRootPath()
        {
            return Server.MapPath("~/");
        }

        [Route("")]
        public ActionResult Index(HomeModel model)
        {
            List<string> files = new List<string>();

            files.AddRange(GetFiles(Server.MapPath("~/lib")));
            files.AddRange(GetFiles(Server.MapPath("~/scripts")));
            files.AddRange(GetFiles(Server.MapPath("~/styles")));
            files.AddRange(GetFiles(Server.MapPath("~/images")));

            model.Files = files;

            return View(model);
        }

        private IEnumerable<string> GetFiles(string dir)
        {
            List<string> result = new List<string>();

            foreach (string f in Directory.GetFiles(dir))
            {
                string path = f.Replace(GetRootPath(), string.Empty);
                result.Add(VirtualPathUtility.ToAbsolute("~/" + path));
                //result.Add(VirtualPathUtility.ToAbsolute("~" + path));
            }

            foreach (var subdir in Directory.GetDirectories(dir))
            {
                result.AddRange(GetFiles(subdir));
            }

            return result;
        }
    }
}