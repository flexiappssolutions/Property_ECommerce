using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PE_Admin_Library
{
    public class MailTemplateDL
    {
        public MailTemplateDL()
        {

        }        

        public static List<MailTemplate> RetrieveMailTemplates()
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var mailTemplates = context.MailTemplates.ToList();

                    return mailTemplates;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static MailTemplate RetrieveMailTemplateByID(long? mailTemplateID)
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var mailTemplates = context.MailTemplates
                                            .Where(f => f.ID == mailTemplateID);

                    return mailTemplates.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static MailTemplate RetrieveMailTemplateByType(string mailTemplateType)
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var mailTemplates = context.MailTemplates
                                            .Where(f => f.Type == mailTemplateType);

                    return mailTemplates.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Update(MailTemplate mailTemplate)
        {
            try
            {
                MailTemplate existingMailTemplate = new MailTemplate();
                using (var context = new PropertyDBEntities())
                {
                    existingMailTemplate = context.MailTemplates
                                    .Where(t => t.ID == mailTemplate.ID)
                                    .FirstOrDefault();
                }

                if (existingMailTemplate != null)
                {
                    existingMailTemplate.Body = mailTemplate.Body;
                    existingMailTemplate.Company = mailTemplate.Company;
                    existingMailTemplate.Footer = mailTemplate.Footer;
                    existingMailTemplate.FromEmailAddress = mailTemplate.FromEmailAddress;
                    existingMailTemplate.Password = mailTemplate.Password;
                    existingMailTemplate.Subject = mailTemplate.Subject;
                    existingMailTemplate.Username = mailTemplate.Username;
                    existingMailTemplate.WebsiteUrl = mailTemplate.WebsiteUrl;

                    using (var context = new PropertyDBEntities())
                    {
                        context.Entry(existingMailTemplate).State = EntityState.Modified;

                        context.SaveChanges();
                    }

                    return true;
                }
                else
                {
                    return false;
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
