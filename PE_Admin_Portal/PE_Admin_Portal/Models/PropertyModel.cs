using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PE_Admin_Portal
{
    public class PropertyModel
    {
        public long PropertyID { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string NumberOfBedrooms { get; set; }
        public string Location { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string Description { get; set; }        
        public virtual ICollection<string> PropertyImages { get; set; }
        public virtual ICollection<string> DeletedPropertyImages { get; set; }
    }
}