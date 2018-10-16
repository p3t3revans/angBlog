
using System.Collections.Generic;


namespace angBlog.Models
{
    public class IndexModel
    {
        public List<Post> RecentPosts { get; set; }

        public List<TagProjection> Tags { get; set; }
    }
}