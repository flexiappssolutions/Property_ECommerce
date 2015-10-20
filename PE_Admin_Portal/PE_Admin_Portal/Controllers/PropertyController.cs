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
            return View();
        }

        public ActionResult ViewProperty()
        {
            return View();
        }
    }
}