using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson.Serialization.Attributes;

namespace ngTest.Models
{
    public class TagProjection
    {
        [BsonElement("_id")]
        public string name { get; set; }

        public int count { get; set; }
    }
}