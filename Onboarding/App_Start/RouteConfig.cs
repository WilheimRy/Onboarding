using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Onboarding
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "order", action = "orderIndex", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "customer",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "customer", action = "Index", id = UrlParameter.Optional }
);


        }
    }
}
