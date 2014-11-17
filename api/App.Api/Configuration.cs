using App.Api.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace App.Api
{
    public sealed class Configuration : HttpConfiguration
    {
        public Configuration()
        {
            this.Filters.Add(new CultureFilterAttribute());
            this.MapHttpAttributeRoutes();
        }
    }
}
