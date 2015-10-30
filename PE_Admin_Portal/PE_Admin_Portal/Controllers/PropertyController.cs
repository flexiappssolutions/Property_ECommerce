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
        public ActionResult ContactUs()
        {
            ViewBag.Title = "Contact Us";

            return View();
        }

        public ActionResult AboutUs()
        {
            ViewBag.Title = "About Us";

            return View();
        }

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

        public ActionResult PropertyList()
        {
            ViewBag.Title = "Property List";

            return View();
        }

        public ActionResult PropertyPage()
        {
            ViewBag.Title = "Property Page";

            return View();
        }

        public ActionResult PropertyEnquiry()
        {
            ViewBag.Title = "Property Enquiry";

            return View();
        }
    }
}