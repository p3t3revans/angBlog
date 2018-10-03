
using System.Collections.Generic;

namespace ngTest.Models
{
    public class IndexModel
    {
        public List<Post> RecentPosts { get; set; }

        public List<TagProjection> Tags { get; set; }
    }
}