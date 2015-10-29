using PE_Admin_Library;
using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;

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

        [HttpPost]
        public HttpResponseMessage SendPropertyEnquiryMessage([FromBody]MailModel mail)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    if (Mail.networkIsAvailable())
                    {                        
                            Mail.SendPropertyEnquiryMessage(mail.CustomerName, mail.CustomerEmailAddress, mail.CustomerPhoneNumber, mail.CustomerMessage, mail.PropertyID);
                            return Request.CreateResponse(HttpStatusCode.OK, "Successful");                       
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.BadRequest, "Kindly ensure that internet connection is available in order to reset your password.");
                    }
                }               
                else
                {
                    string errors = GetErrorListFromModelState(ModelState);
                    return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
                }
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpPost]
        public HttpResponseMessage SendEnquiryMessage([FromBody]MailModel mail)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (Mail.networkIsAvailable())
                    {
                        Mail.SendEnquiryMessage(mail.CustomerName, mail.CustomerEmailAddress, mail.CustomerPhoneNumber, mail.CustomerMessage);
                        return Request.CreateResponse(HttpStatusCode.OK, "Successful");
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.BadRequest, "Kindly ensure that internet connection is available in order to reset your password.");
                    }
                }
                else
                {
                    string errors = GetErrorListFromModelState(ModelState);
                    return Request.CreateResponse(HttpStatusCode.BadRequest, errors);
                }
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

        [HttpPost]
        public HttpResponseMessage PropertyEnquiry([FromBody]MailModel propertyModel)
        {
            try
            {
                string key = System.Configuration.ConfigurationManager.AppSettings.Get("ekey");
                
                string propertyID = Crypter.Decrypt(key, propertyModel.PropertyID);
                
                Object propertyDetail = PropertyPL.RetrievePropertyByID(Convert.ToInt64(propertyID));
                
                return Request.CreateResponse(HttpStatusCode.OK, propertyDetail);
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        public static string GetErrorListFromModelState(ModelStateDictionary modelState)
        {
            string errors = "";
            var query = from state in modelState.Values
                        from error in state.Errors
                        select error.ErrorMessage;

            var errorList = query.ToList();
            foreach(string error in errorList)
            {
                errors += error.TrimEnd('.') + ", ";
            }
            return errors.TrimEnd(',',' ');
        }
    }
}
