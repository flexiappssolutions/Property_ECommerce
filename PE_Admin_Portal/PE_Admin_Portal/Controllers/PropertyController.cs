using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PE_Admin_Portal.Controllers
{
    public class PropertyController : Controller
    {
        // GET: Property
        public ActionResult UploadProperty()
        {
            ViewBag.Title = "Upload Property";

            return View();
        }

        public ActionResult ViewProperty()
        {
            ViewBag.Title = "View Property";

            return View();
        }
    }
}