using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace angBlog.Models
{
    [BsonIgnoreExtraElements]
    public class MongoForecast
    {
        public BsonObjectId _id { get; set; }
        public BsonDateTime date { get; set; }
        public int tempC { get; set; }
        public string summary { get; set; }
    }
}
