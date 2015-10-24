using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PE_Admin_Portal.Controllers
{
    public class AdminHomeController : Controller
    {
       
        // GET: AdminHome
        public ActionResult Dashboard()
        {
            ViewBag.Title = "Admin Dashboard";

            return View();
        }
    }
}