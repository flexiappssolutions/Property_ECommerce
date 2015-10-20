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
            return View();
        }

        public ActionResult ForgotPassword()
        {
            return View();
        }
    }
}