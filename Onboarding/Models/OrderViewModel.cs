using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CobraOnBoarding.DataAccess;

namespace Onboarding.Models
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
    }
}