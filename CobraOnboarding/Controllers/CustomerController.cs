using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CobraOnBoarding.DataAccess;

namespace CobraOnboarding.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            var customers = CustomerDb.GetAllCustomers();
            return Json(customers);
        }
    }
}