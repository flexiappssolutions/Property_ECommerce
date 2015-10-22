using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PE_Admin_Portal.Controllers
{
    public class PasswordController : Controller
    {
        // GET: Password
        public ActionResult ChangePassword()
        {
            ViewBag.Title = "Change Password";

            return View();
        }

        public ActionResult ForgotPassword()
        {
            ViewBag.Title = "Forgot Password";

            return View();
        }

        public ActionResult PasswordReset()
        {
            ViewBag.Title = "Password Reset";

            return View();
        }
    }
}