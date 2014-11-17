using System;
using System.IO;
using System.Net.Http.Headers;

namespace App.Api
{
    public static class PathHelper
    {
        public static MediaTypeHeaderValue GetMimeType(string path)
        {
            var extension = Path.GetExtension(path);

            switch (extension)
            {
                case ".js":
                    return new MediaTypeHeaderValue("text/javascript");

                case ".css":
                    return new MediaTypeHeaderValue("text/css");

                case ".html":
                    return new MediaTypeHeaderValue("text/html");

                case ".json":
                    return new MediaTypeHeaderValue("application/json");

                default:
                    throw new NotSupportedException();
            }
        }
    }
}
