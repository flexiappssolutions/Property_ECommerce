using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PE_Admin_Library
{
    public class PropertyPL
    {
        public PropertyPL()
        {

        }

        public static bool Save(PropertyDetail propertyDetails)
        {
            try
            {
                return PropertyDL.Save(propertyDetails);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<Object> RetrievePropertyDetails()
        {
            try
            {
                List<Object> returnedPropertyDetails = new List<Object>();

                List<PropertyDetail> propertyDetails = PropertyDL.RetrievePropertyDetails();

                foreach (PropertyDetail propertyDetail in propertyDetails)
                {
                    ICollection<Object> propertyImages = new List<Object>();
                    foreach(PropertyImage propertyImage in propertyDetail.PropertyImages)
                    {
                        Object base64Image = new
                        {
                            Image = "data:image/png;base64," + System.Convert.ToBase64String(propertyImage.Image, 0, propertyImage.Image.Length),
                            ImageID = propertyImage.PropertyImageID
                        };                       
                        propertyImages.Add(base64Image);
                    }

                    Object propertyDetailObj = new
                    {
                        PropertyID = propertyDetail.PropertyID,
                        Title = propertyDetail.Title,
                        Type = propertyDetail.Type,
                        NumberOfBedrooms = propertyDetail.NumberOfBedrooms,
                        Location = propertyDetail.Location,
                        Price = propertyDetail.Price,
                        ModifiedPrice = Convert.ToDecimal(propertyDetail.Price).ToString("N"),
                        Description = propertyDetail.Description,
                        PropertyImages = propertyImages,
                        DateUploaded = propertyDetail.DateUploaded,
                        Status = propertyDetail.Status,
                    };

                    returnedPropertyDetails.Add(propertyDetailObj);
                }

                return returnedPropertyDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Update(PropertyDetail propertyDetails, List<long> imageIDToRemove, List<byte[]> newImages)
        {
            try
            {
                return PropertyDL.Update(propertyDetails, imageIDToRemove, newImages);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
