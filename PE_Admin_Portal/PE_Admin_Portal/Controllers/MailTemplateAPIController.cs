using PE_Admin_Library;
using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PE_Admin_Portal.Controllers
{
    public class MailTemplateAPIController : ApiController
    {
        [HttpPut]
        public HttpResponseMessage UpdateMailTemplate([FromBody]MailTemplate mailTemplate)
        {
            try
            {
                bool result = MailTemplatePL.Update(mailTemplate);
                return result.Equals(true) ? Request.CreateResponse(HttpStatusCode.OK, "Successful") : Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpGet]
        public HttpResponseMessage RetrieveMailTemplates()
        {
            try
            {
                IEnumerable<MailTemplate> mailTemplates = MailTemplatePL.RetrieveMailTemplates();
                object returnedMailTemplates = new { data = mailTemplates };
                return Request.CreateResponse(HttpStatusCode.OK, returnedMailTemplates);
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.ReasonPhrase = ex.Message;
                return response;
            }
        }
    }
}
