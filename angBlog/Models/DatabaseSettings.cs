using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angBlog.Models
{
    public class DatabaseSettings
    {
        public string Hostname { get; set; }
        public int Port { get; set; }
        public string DbName { get; set; }
    }
}
