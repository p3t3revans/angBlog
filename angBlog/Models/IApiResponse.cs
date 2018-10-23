using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angBlog.Models
{
    public class IApiResponse
    {
        public bool status { set; get; } = false;

        public string error { set; get; } = "501";
    }
}
