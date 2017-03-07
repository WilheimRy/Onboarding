using CobraOnBoarding.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding.Models;

namespace Onboarding.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult OrderIndex()
        {
            return View();
        }

        public ActionResult GetOrders()
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var result = GetOrderResult(context);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetProductPriceByProductName(string productName)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var price = context.Products.SingleOrDefault(x=>x.ProductName.Equals(productName)).Price.ToString();
                return Content(price);
            }
        }

        private static object GetOrderResult(CobraOnboardingDbEntities context)
        {
            var orders = (from orderDetail in context.OrderDetails
                          join orderHeader in context.OrderHeaders on orderDetail.OrderId equals orderHeader.OrderId
                          join product in context.Products on orderDetail.ProductId equals product.Id
                          join person in context.People on orderHeader.PersonId equals person.Id
                          select
                          new
                          {
                              orderDetail.OrderId, orderHeader.OrderDate, person.CustomerName, product.ProductName,
                              product.Price
                          }).OrderBy(x => x.OrderDate).ToList();

            var customers = context.People.ToList();
            var products = context.Products.ToList();
            var result = new { orders = orders, customers = customers, products = products };
            return result;
        }

        [HttpPost]
        public ActionResult InsertOneOrder(OrderViewModel order)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var personId = context.People.SingleOrDefault(x => x.CustomerName.Equals(order.CustomerName)).Id;

                var orderHeader = new OrderHeader()
                {
                    OrderDate = order.OrderDate,
                    PersonId = personId
                };
                context.OrderHeaders.Add(orderHeader);
                context.SaveChanges();

                var orderId = context.OrderHeaders.OrderByDescending(x => x.OrderId).FirstOrDefault().OrderId;
                var productId = context.Products.SingleOrDefault(x => x.ProductName.Equals(order.ProductName)).Id;

                var orderDetail = new OrderDetail()
                { ProductId = productId, OrderId = orderId };
                
                context.OrderDetails.Add(orderDetail);
                context.SaveChanges();

                return Json(null);
            }
        }

        [HttpPost]
        public ActionResult UpdateOneOrder(OrderViewModel order)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var orderHeader = context.OrderHeaders.SingleOrDefault(x => x.OrderId == order.OrderId);

                var personId = context.People.SingleOrDefault(x => x.CustomerName.Equals(order.CustomerName)).Id;

                if (orderHeader != null)
                {
                    orderHeader.OrderId = order.OrderId;
                    orderHeader.OrderDate = order.OrderDate;
                    orderHeader.PersonId = personId;
                }

                var orderDetail = context.OrderDetails.SingleOrDefault(x => x.OrderId == order.OrderId);

                var productId = context.Products.SingleOrDefault(x => x.ProductName.Equals(order.ProductName)).Id;


                if (orderDetail != null)
                {
                    orderDetail.ProductId = productId;
                }
                context.SaveChanges();

                return Json(null);
            }
        }


        [HttpPost]
        public ActionResult DeleteOneOrder(OrderViewModel order)
        {
            using (var context = new CobraOnboardingDbEntities())
            {
                context.Configuration.LazyLoadingEnabled = false;

                var orderDetail = context.OrderDetails.SingleOrDefault(x => x.OrderId == order.OrderId);

                if (orderDetail != null)
                {
                    context.OrderDetails.Remove(orderDetail);
                }
                var orderHeader = context.OrderHeaders.SingleOrDefault(x => x.OrderId == order.OrderId);

                if (orderHeader != null)
                {
                    context.OrderHeaders.Remove(orderHeader);
                }

                context.SaveChanges();

                return Json(null);
            }
        }


    }
}