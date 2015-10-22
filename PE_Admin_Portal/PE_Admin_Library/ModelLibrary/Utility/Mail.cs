using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace PE_Admin_Library
{
    public class Mail
    {        
        public static void SendForgotPasswordMail(User user)
        {
            try
            {
                string key = System.Configuration.ConfigurationManager.AppSettings.Get("ekey");
                string encrypted_username = Crypter.Encrypt(key, user.Username);

                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("Password Reset");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl + "Password/PasswordReset?rq=" + encrypted_username;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;

                string body = "";

                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/PasswordReset.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", user.Othernames);               
                body = body.Replace("#url", websiteUrl);
                body = body.Replace("#footer", footer);
                body = body.Replace("#body", mailBody);


                MailMessage mail = new MailMessage();
                mail.To.Add(user.Email);
                mail.From = new MailAddress(fromAddress);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential(username, password);// Enter seders User name and password
                smtp.EnableSsl = true;
                smtp.Send(mail);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }        

        public static bool networkIsAvailable()
        {
            try
            {
                using(var client = new WebClient())
                {
                    using(var stream = client.OpenRead("http://www.google.com"))
                    {
                        return true;
                    }
                }
            }
            catch
            {
                return false;
            }           
        }
    }
}
