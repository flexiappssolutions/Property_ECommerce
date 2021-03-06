﻿using PE_Admin_Library.ModelLibrary.EntityFrameworkLib;
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

        public static List<PropertyDetail> RetrieveTwelvePropertyDetails()
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var propertyDetails = context.PropertyDetails.Include("PropertyImages").Where(p => p.Status != StatusUtil.PropertyStatus.Sold.ToString() && p.Status != StatusUtil.PropertyStatus.Deleted.ToString()).OrderByDescending(p => p.DateUploaded).Take(12).ToList();

                    return propertyDetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static PropertyDetail RetrievePropertyByID(long propertyID)
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var propertyDetails = context.PropertyDetails.Include("PropertyImages")
                                                    .Where(p => p.PropertyID.Equals(propertyID))
                                                    .ToList();

                    return propertyDetails.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<PropertyImage> RetrieveSixPropertyImages()
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var propertyImages = context.PropertyImages.Include("PropertyDetail").OrderByDescending(p => p.PropertyImageID).Take(6).ToList();

                    return propertyImages;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<PropertyDetail> RetrieveAllPropertyDetails()
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    var propertyDetails = context.PropertyDetails.Include("PropertyImages").OrderByDescending(p => p.DateUploaded).ToList();

                    return propertyDetails;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<PropertyDetail> SearchPropertyDetails(string location, string propertyType, string numberOfBedrooms, string priceFrom, string priceTo)
        {
            try
            {
                using (var context = new PropertyDBEntities())
                {
                    IQueryable<PropertyDetail> propertyDetails = context.PropertyDetails.Include("PropertyImages")
                                                                .OrderByDescending(p => p.DateUploaded)
                                                                .Where(x => x.Location.Equals(location));

                    if (!string.IsNullOrEmpty(propertyType))
                        propertyDetails = propertyDetails.Where(x => x.Type.Equals(propertyType));

                    if (!string.IsNullOrEmpty(numberOfBedrooms))
                        propertyDetails = propertyDetails.Where(x => x.NumberOfBedrooms.Equals(numberOfBedrooms));

                    if (!string.IsNullOrEmpty(priceFrom) && !string.IsNullOrEmpty(priceTo))
                    {
                        decimal fromPrice = Math.Round(Convert.ToDecimal(priceFrom), 0);
                        decimal toPrice = Math.Round(Convert.ToDecimal(priceTo), 0);
                        propertyDetails = propertyDetails.Where(x => x.Price >= fromPrice && x.Price <= toPrice);
                    }

                    if (!string.IsNullOrEmpty(priceFrom) && string.IsNullOrEmpty(priceTo))
                    {
                        decimal fromPrice = Math.Round(Convert.ToDecimal(priceFrom), 0);                        
                        propertyDetails = propertyDetails.Where(x => x.Price >= fromPrice);
                    }

                    if (string.IsNullOrEmpty(priceFrom) && !string.IsNullOrEmpty(priceTo))
                    {                        
                        decimal toPrice = Math.Round(Convert.ToDecimal(priceTo), 0);
                        propertyDetails = propertyDetails.Where(x => x.Price <= toPrice);
                    }

                    return propertyDetails.ToList();
                }
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
                PropertyDetail existingPropertyDetails = new PropertyDetail();
                using (var context = new PropertyDBEntities())
                {
                    existingPropertyDetails = context.PropertyDetails.Include("PropertyImages")
                                    .Where(t => t.PropertyID == propertyDetails.PropertyID)
                                    .FirstOrDefault();
                }

                if (existingPropertyDetails != null)
                {
                    existingPropertyDetails.Title = propertyDetails.Title;
                    existingPropertyDetails.Type = propertyDetails.Type;
                    existingPropertyDetails.NumberOfBedrooms = propertyDetails.NumberOfBedrooms;
                    existingPropertyDetails.Location = propertyDetails.Location;
                    existingPropertyDetails.Price = propertyDetails.Price;
                    existingPropertyDetails.Description = propertyDetails.Description;

                    using (var context = new PropertyDBEntities())
                    {
                        //Transaction block
                        using (var transaction = context.Database.BeginTransaction())
                        {
                            try
                            {
                                //Modifying just the property details
                                context.Entry(existingPropertyDetails).State = EntityState.Modified;
                                context.SaveChanges();

                                //Delete block for images that were removed from the property
                                IEnumerable<PropertyImage> existingImages = context.PropertyImages.Include("PropertyDetail")
                                                                .Where(t => imageIDToRemove.Contains(t.PropertyImageID))
                                                                .ToList();

                                if (existingImages != null && existingImages.ToList().Count != 0)
                                {
                                    context.PropertyImages.RemoveRange(existingImages);
                                    context.SaveChanges();
                                }

                                //Adding new images for the property
                                List<PropertyImage> newPropertyImages = new List<PropertyImage>();
                                foreach (byte[] newImage in newImages)
                                {
                                    PropertyImage newPropertyImage = new PropertyImage();
                                    newPropertyImage.PropertyID = propertyDetails.PropertyID;
                                    newPropertyImage.Image = newImage;

                                    newPropertyImages.Add(newPropertyImage);
                                }
                                if (newPropertyImages != null && newPropertyImages.Count != 0)
                                {
                                    context.PropertyImages.AddRange(newPropertyImages);
                                    context.SaveChanges();
                                }
                                
                                //commit changes
                                transaction.Commit();
                            }
                            catch (Exception ex)
                            {
                                transaction.Rollback();
                                throw ex;
                            }
                        }   
                        
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

        public static bool UpdatePropertyAsSold(PropertyDetail propertyDetails)
        {
            try
            {
                PropertyDetail existingPropertyDetails = new PropertyDetail();
                using (var context = new PropertyDBEntities())
                {
                    existingPropertyDetails = context.PropertyDetails.Include("PropertyImages")
                                    .Where(t => t.PropertyID == propertyDetails.PropertyID)
                                    .FirstOrDefault();
                }

                if (existingPropertyDetails != null)
                {
                    existingPropertyDetails.Status = propertyDetails.Status;

                    using (var context = new PropertyDBEntities())
                    {                                                
                        context.Entry(existingPropertyDetails).State = EntityState.Modified;
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
