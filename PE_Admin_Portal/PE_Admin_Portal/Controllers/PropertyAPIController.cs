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
    public class PropertyAPIController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Save([FromBody]PropertyModel propertyModel)
        {
            try
            {                
                ICollection<PropertyImage> propertyImages = new List<PropertyImage>();

                foreach(string base64Image in propertyModel.PropertyImages)
                {
                    PropertyImage propertyImage = new PropertyImage();
                    propertyImage.Image = System.Convert.FromBase64String(base64Image);
                    propertyImages.Add(propertyImage);
                }

                PropertyDetail propertyDetail = new PropertyDetail();
                propertyDetail.Title = propertyModel.Title;
                propertyDetail.Type = propertyModel.Type;
                propertyDetail.NumberOfBedrooms = propertyModel.NumberOfBedrooms;
                propertyDetail.Location = propertyModel.Location;
                propertyDetail.Price = propertyModel.Price;
                propertyDetail.Description = propertyModel.Description;
                propertyDetail.PropertyImages = propertyImages;
                propertyDetail.DateUploaded = System.DateTime.Now;
                propertyDetail.Status = StatusUtil.PropertyStatus.Available.ToString(); 
               
               
                bool result = PropertyPL.Save(propertyDetail);
                if (result)
                    return Request.CreateResponse(HttpStatusCode.OK, "Successful");
                else
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Failed");                
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
                return response;
            }
        }

        [HttpGet]
        public HttpResponseMessage RetrieveAll()
        {
            try
            {
                IEnumerable<Object> propertyDetails = PropertyPL.RetrievePropertyDetails();
                object returnedPropertyDetails = new { data = propertyDetails };
                return Request.CreateResponse(HttpStatusCode.OK, returnedPropertyDetails);
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.ReasonPhrase = ex.Message;
                return response;
            }
        }
    }
}
