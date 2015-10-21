using LoyaltyLibrary.ModelLayer;
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
        public static void SendNewUserMail(User user)
        {           
            try
            {
                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("New User");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;
                
                string body = "";                
                
                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/NewUser.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", user.Othernames);
                body = body.Replace("#username", user.Username);
                body = body.Replace("#password", user.Password);
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
                string websiteUrl = mailTemplate.WebsiteUrl + "Login/PasswordReset?rq=" + encrypted_username;
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

        public static void SendCustomerRegistrationMail(CustomerCard user)
        {
            try
            {
                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("Customer Registration");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;

                string body = "";

                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/CustomerRegistration.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", user.Othernames);
                body = body.Replace("#url", websiteUrl);
                body = body.Replace("#cardpan", user.CardPan);
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

        public static void SendAcknowledgementMail(string hashedCardPan)
        {
            try
            {
                string key = System.Configuration.ConfigurationManager.AppSettings.Get("ekey");
                CustomerCard customerCard = CustomerCardPL.RetrieveCustomerCardByHashedPan(hashedCardPan);


                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("Acknowedge Card");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;

                string body = "";

                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/Pickupcard.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", customerCard.Othernames);
                body = body.Replace("#url", websiteUrl);
                body = body.Replace("#cardpan", Crypter.Decrypt(key, customerCard.CardPan));
                body = body.Replace("#footer", footer);
                body = body.Replace("#body", mailBody);


                MailMessage mail = new MailMessage();
                mail.To.Add(customerCard.Email);
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

        public static void SendCardIssueMail(string hashedCardPan)
        {
            try
            {
                string key = System.Configuration.ConfigurationManager.AppSettings.Get("ekey");
                CustomerCard customerCard = CustomerCardPL.RetrieveCustomerCardByHashedPan(hashedCardPan);


                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("Issue Card");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;

                string body = "";

                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/Issue.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", customerCard.Othernames);
                body = body.Replace("#url", websiteUrl);
                body = body.Replace("#moviepoint", FreeTicketConfigurationPL.RetrieveFreeTicketConfigurationByID(1).MinimumAmount.ToString());
                body = body.Replace("#footer", footer);
                body = body.Replace("#body", mailBody);


                MailMessage mail = new MailMessage();
                mail.To.Add(customerCard.Email);
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

        public static void SendPointsGenerationMail(string points, string cardBalance, string minimumMovieAmount, string customerName, string customerEmail)
        {
            try
            {
                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("Points Generation");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;

                string body = "";

                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/GeneratePoints.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", customerName);
                body = body.Replace("#url", websiteUrl);
                body = body.Replace("#moviepoint", minimumMovieAmount);
                body = body.Replace("#pointsgenerated", points);
                body = body.Replace("#cardbalance", cardBalance);
                body = body.Replace("#footer", footer);
                body = body.Replace("#body", mailBody);


                MailMessage mail = new MailMessage();
                mail.To.Add(customerEmail);
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

        public static void SendPointsCheckOutMail(string points, string cardBalance, string customerName, string customerEmail)
        {
            try
            {
                MailTemplate mailTemplate = MailTemplatePL.RetrieveMailTemplateByType("Checkout Points");
                string fromAddress = mailTemplate.FromEmailAddress;
                string username = mailTemplate.Username;
                string password = mailTemplate.Password;
                string company = mailTemplate.Company;
                string websiteUrl = mailTemplate.WebsiteUrl;
                string footer = mailTemplate.Footer;
                string subject = mailTemplate.Subject;
                string mailBody = mailTemplate.Body;

                string body = "";

                body = System.IO.File.ReadAllText(System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/EmailTemplate/CheckOutPoints.txt"));
                body = body.Replace("#company", company);
                body = body.Replace("#firstname", customerName);
                body = body.Replace("#url", websiteUrl);                
                body = body.Replace("#pointsgenerated", points.ToString());
                body = body.Replace("#cardbalance", cardBalance.ToString());
                body = body.Replace("#footer", footer);
                body = body.Replace("#body", mailBody);


                MailMessage mail = new MailMessage();
                mail.To.Add(customerEmail);
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
