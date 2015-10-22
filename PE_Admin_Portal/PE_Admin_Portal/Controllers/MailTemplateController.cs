using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PE_Admin_Portal.Controllers
{
    public class MailTemplateController : Controller
    {
        // GET: MailTemplate
        public ActionResult MailTemplate()
        {
            ViewBag.Title = "E-Mail Template";

            return View();
        }
    }
}