using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace angBlog.Models
{
    public class MongoPost
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string author { get; set; }

        public string title { get; set; }

        public string content { get; set; }

        public string[] tags { get; set; }

        public BsonDateTime createDate { get; set; }

        public List<Comment> comments { get; set; }

        public int likes { get; set; }

        public int dislikes { get; set; }

    }
}
