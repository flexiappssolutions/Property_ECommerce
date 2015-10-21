using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PE_Admin_Library
{
    public class PropertyDL
    {
        public PropertyDL()
        {

        }

        public static bool Save(PropertyDetail propertyDetails)
        {
            try
            {                                
                using (var context = new PropertyDBEntities())
                {                    
                    context.PropertyDetails.Add(propertyDetails);
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<PropertyDetail> RetrievePropertyDetails()
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var propertyDetails = context.PropertyDetails.Include("PropertyImages").Where(p => p.Status != StatusUtil.PropertyStatus.Sold.ToString() && p.Status != StatusUtil.PropertyStatus.Deleted.ToString()).ToList();

                    return propertyDetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
