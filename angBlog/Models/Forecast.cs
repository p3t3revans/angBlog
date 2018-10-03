using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ngTest.Models
{
    [BsonIgnoreExtraElements]
    public class Forecast
    {
        public BsonObjectId _id { get; set; }
        public string date { get; set; }
        public int tempC { get; set; }
        //public int tempF { get; set; }
        public string summary { get; set; }

    }
}
