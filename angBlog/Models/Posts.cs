using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angBlog.Models
{
    public class Posts
    {
        public int count { set; get; }
        public List<Post> posts { set; get; }
    }
}
