using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace PE_Admin_Portal
{
    public class MailModel
    {        
        public string PropertyID { get; set; }

        [Required]
        [DisplayName("Name")]
        public string CustomerName { get; set; }

        [Required]
        [DisplayName("Phone Number")]
        public string CustomerPhoneNumber { get; set; }

        [Required]
        [DisplayName("Email Address")]
        [DataType(DataType.EmailAddress)]
        public string CustomerEmailAddress { get; set; }

        [Required]
        [DisplayName("Message")]
        public string CustomerMessage { get; set; }
    }
}