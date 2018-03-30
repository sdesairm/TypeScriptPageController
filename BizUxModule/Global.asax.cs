using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace BizUxModule
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            // Add these two lines to initialize Routes and Filters:
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            string s = "";
        }
    }
}