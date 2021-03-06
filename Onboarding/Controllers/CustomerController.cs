﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CobraOnBoarding.DataAccess;

namespace Onboarding.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCustomers()
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;
                var customers = context.People.ToList();
                return Json(customers, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult InsertCustomers(Person person)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                context.People.Add(person);
                context.SaveChanges();
                var customers = context.People.ToList();
                return Json(customers, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateOneCustomer(Person person)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var personInDb = context.People.SingleOrDefault(x => x.Id == person.Id);

                if (personInDb != null)
                {
                    personInDb.CustomerName = person.CustomerName;
                    personInDb.Address1 = person.Address1;
                    personInDb.Address2 = person.Address2;
                    personInDb.Town_City = person.Town_City;
                }

                context.SaveChanges();
                var customers = context.People.ToList();
                return Json(customers, JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult DeleteOneCustomer(Person person)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var personInDb = context.People.SingleOrDefault(x => x.Id == person.Id);

                if (personInDb != null)
                {
                    context.People.Remove(personInDb);
                }

                context.SaveChanges();
                var customers = context.People.ToList();
                return Json(customers, JsonRequestBehavior.AllowGet);
            }
        }



    }
}