using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PE_Admin_Portal.Controllers
{
    public class AdminLoginController : Controller
    {       
        // GET: AdminLogin
        public ActionResult SignIn()
        {
            ViewBag.Title = "Sign In";

            return View();
        }
    }
}