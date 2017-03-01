using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CobraOnBoarding.DataAccess
{
    public static class CustomerDb
    {
        public static List<Person> GetAllCustomers()
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                return context.People.ToList();
            }
        }
    }
}