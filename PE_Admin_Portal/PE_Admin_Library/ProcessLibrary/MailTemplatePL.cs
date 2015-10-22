using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PE_Admin_Library
{
    public class MailTemplatePL
    {
        public MailTemplatePL()
        {

        }

        public static bool Update(MailTemplate mailTemplate)
        {
            try
            {
                return MailTemplateDL.Update(mailTemplate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<MailTemplate> RetrieveMailTemplates()
        {
            try
            {
                return MailTemplateDL.RetrieveMailTemplates();
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
                return MailTemplateDL.RetrieveMailTemplateByID(mailTemplateID);
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
                return MailTemplateDL.RetrieveMailTemplateByType(mailTemplateType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }        
    }
}
