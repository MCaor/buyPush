using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Globalization;
using System.Configuration;

namespace App.Api.Filters
{
    public sealed class CultureFilterAttribute : ActionFilterAttribute
    {

        private bool HasCultureCookie(HttpRequestMessage request)
        {
            string cultureName;

            return HasCultureCookie(request, out cultureName);
        }

        private bool HasCultureCookie(HttpRequestMessage request, out string isoCultureName)
        {
            CookieHeaderValue cultureCookie = request.Headers.GetCookies("app.culture").FirstOrDefault();
                    //.SingleOrDefault(c => c.Cookies.Any(some => some.Name == "app.culture"));

            if (cultureCookie != null)
            {
                isoCultureName = cultureCookie.Cookies.First().Value;

                return true;
            }
            else
            {
                isoCultureName = null;

                return false;
            }
        }

        public void EvalCulture(HttpActionContext actionContext)
        {
            string isoCultureName;

            CookieHeaderValue cultureCookie = actionContext.Request.Headers.GetCookies("app.culture").FirstOrDefault();
                    //.SingleOrDefault(c => c.Cookies.Any(some => some.Name == "app.culture"));

            if (HasCultureCookie(actionContext.Request, out isoCultureName))
            {
                Thread.CurrentThread.CurrentCulture = new CultureInfo(isoCultureName);
            }
            else
            {
                Thread.CurrentThread.CurrentCulture = new CultureInfo(ConfigurationManager.AppSettings["defaultCulture"]);
            }
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            EvalCulture(actionContext);
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (!HasCultureCookie(actionExecutedContext.Request))
            {
                CookieHeaderValue cookie = new CookieHeaderValue("app.culture", Thread.CurrentThread.CurrentCulture.Name);
                cookie.Path = "/";

                actionExecutedContext.Response.Headers.AddCookies(new[] { cookie });
            }
        }
    }
}
