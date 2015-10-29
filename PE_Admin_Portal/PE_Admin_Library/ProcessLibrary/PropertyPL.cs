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

        public static Object RetrievePropertyByID(long propertyID)
        {
            try
            {
                Object propertyDetailObj = new object();

                PropertyDetail propertyDetail = PropertyDL.RetrievePropertyByID(propertyID);

                ICollection<Object> propertyImages = new List<Object>();
                foreach (PropertyImage propertyImage in propertyDetail.PropertyImages)
                {
                    Object base64Image = new
                    {
                        Image = "data:image/png;base64," + System.Convert.ToBase64String(propertyImage.Image, 0, propertyImage.Image.Length),
                        ImageID = propertyImage.PropertyImageID
                    };
                    propertyImages.Add(base64Image);
                }

                propertyDetailObj = new
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
                    DateUploaded = String.Format("{0:dddd, MMMM d, yyyy}", Convert.ToDateTime(propertyDetail.DateUploaded)),
                    Status = propertyDetail.Status,
                };

                return propertyDetailObj;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
             
        public static List<Object> RetrieveTwelvePropertyDetails()
        {
            try
            {
                List<Object> returnedPropertyDetails = new List<Object>();

                List<PropertyDetail> propertyDetails = PropertyDL.RetrieveTwelvePropertyDetails();

                foreach (PropertyDetail propertyDetail in propertyDetails)
                {
                    ICollection<Object> propertyImages = new List<Object>();
                    foreach (PropertyImage propertyImage in propertyDetail.PropertyImages)
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
                        DateUploaded = String.Format("{0:dddd, MMMM d, yyyy}", Convert.ToDateTime(propertyDetail.DateUploaded)),
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

        public static List<Object> RetrieveSixPropertyImages()
        {
            try
            {
                List<Object> returnedPropertyImages = new List<Object>();

                List<PropertyImage> propertyImages = PropertyDL.RetrieveSixPropertyImages();

                foreach (PropertyImage propertyImage in propertyImages)
                {                    
                    Object base64Image = new
                    {
                        Image = "data:image/png;base64," + System.Convert.ToBase64String(propertyImage.Image, 0, propertyImage.Image.Length)
                    };


                    returnedPropertyImages.Add(base64Image);
                }

                return returnedPropertyImages;
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

                List<PropertyDetail> propertyDetails = PropertyDL.RetrieveAllPropertyDetails();

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
                        DateUploaded = String.Format("{0:dddd, MMMM d, yyyy}", Convert.ToDateTime(propertyDetail.DateUploaded)),
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

        public static List<Object> SearchPropertyDetails(string location, string propertyType, string numberOfBedrooms, string priceFrom, string priceTo)
        {
            try
            {
                List<Object> returnedPropertyDetails = new List<Object>();

                List<PropertyDetail> propertyDetails = PropertyDL.SearchPropertyDetails(location, propertyType, numberOfBedrooms, priceFrom, priceTo);

                foreach (PropertyDetail propertyDetail in propertyDetails)
                {
                    ICollection<Object> propertyImages = new List<Object>();
                    foreach (PropertyImage propertyImage in propertyDetail.PropertyImages)
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
                        DateUploaded = String.Format("{0:dddd, MMMM d, yyyy}", Convert.ToDateTime(propertyDetail.DateUploaded)),
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

        public static bool UpdatePropertyAsSold(PropertyDetail propertyDetails)
        {
            try
            {
                return PropertyDL.UpdatePropertyAsSold(propertyDetails);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
