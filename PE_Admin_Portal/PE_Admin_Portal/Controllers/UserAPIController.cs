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
    public class UserAPIController : ApiController
    {
        [HttpPut]
        public HttpResponseMessage ChangePassword([FromBody]ChangePassword changePassword)
        {
            try
            {
                string password = changePassword.NewPassword;
                string username = changePassword.Username;
                bool result = UserPL.ChangePassword(username, password);
                return result.Equals(true) ? Request.CreateResponse(HttpStatusCode.OK, "Successful") : Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpPut]
        public HttpResponseMessage ForgotPassword([FromBody]ChangePassword changePassword)
        {
            try
            {
                if (Mail.networkIsAvailable())
                {
                    string username = changePassword.Username;
                    User user = UserPL.RetrieveUserByUsername(username);
                    if (user != null)
                    {

                        Mail.SendForgotPasswordMail(user);
                        return Request.CreateResponse(HttpStatusCode.OK, "Successful");
                    }
                    else
                        return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid username");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Kindly ensure that internet connection is available in order to reset your password.");
                }
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpPost]
        public HttpResponseMessage ConfirmUsername([FromBody]ChangePassword changePassword)
        {
            try
            {
                string key = System.Configuration.ConfigurationManager.AppSettings.Get("ekey");
                string username = Crypter.Decrypt(key, changePassword.Username);
                User user = UserPL.RetrieveUserByUsername(username);
                if (user != null)
                {                    
                    object response = new
                    {
                        Status = "Successful",
                        Username = user.Username
                    };
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid username");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }
      
        [HttpPost]
        public HttpResponseMessage AuthenticateUser([FromBody]User user)
        {
            try
            {                
                User userObj = UserPL.AuthenticateUser(user.Username, user.Password);
                if (userObj != null)
                    return Request.CreateResponse(HttpStatusCode.OK, userObj);
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid/Password");
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }
    }
}
