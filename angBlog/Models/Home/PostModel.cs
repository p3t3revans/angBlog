﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace angBlog.Models
{
    public class PostModel
    {
        public Post Post { get; set; }

        public NewCommentModel NewComment { get; set; }
    }
}