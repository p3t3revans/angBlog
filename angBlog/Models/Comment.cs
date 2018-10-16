﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace angBlog.Models
{
    public class Comment
    {
        public string createUser { get; set; }

        public string text { get; set; }

        public DateTime commentDate{ get; set; }

        public int likes { get; set; }

        public int dislikes { get; set; }
    }
}