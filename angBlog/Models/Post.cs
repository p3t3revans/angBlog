using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ngTest.Models
{
    [BsonIgnoreExtraElements]
    public class Post
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string author { get; set; }

        public string title { get; set; }

        public string content { get; set; }

        public string[] tags { get; set; }

        public DateTime createDate { get; set; }

        public List<Comment> comments { get; set; }

        public int likes { get; set; }

        public int dislikes { get; set; }
    }
}