using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebMain.Models;

namespace WebMain
{
    public class MMController : ApiController
    {
        [HttpGet]
        public DashboardModel GetDashboard()
        {
            return new DashboardModel() { };
        }
        [HttpPost]
        public bool AuthenticateUser([FromBody]string credentials)
        {
            JObject cred = JObject.Parse(credentials);
            string userName = cred.SelectToken("username").ToString();
            string password = cred.SelectToken("password").ToString();
            return (userName == "asdf" && password == "asdf");
        }

        [HttpPost]
        public bool Logout()
        {
            return true;
        }
    }
}