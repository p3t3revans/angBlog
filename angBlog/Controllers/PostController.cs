using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using angBlog.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authorization;

namespace angBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        // GET: api/Post
        [HttpGet("[action]")]
        public async Task<Posts> GetPosts([FromQuery] string page, string limit)
        {
            Posts posts = new Posts();
            posts.posts = new List<MongoPost>();
            //var blogContext = new BlogContext();
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var skip = (int.Parse(page) - 1) * (int.Parse(limit));
            var numberOfForecasts = await col.Find(FilterDefinition<MongoPost>.Empty).CountDocumentsAsync();
            posts.count = (int)numberOfForecasts;
            try
            {
                var recentPosts = await col.Find(FilterDefinition<MongoPost>.Empty)
                                    .Skip(skip)
                                    .Limit(int.Parse(limit))
                                    .Sort(Builders<MongoPost>.Sort.Descending("createDate"))
                                    .ToListAsync();
                var index = 0;
                foreach (var doc in recentPosts)
                {
                    var post = new MongoPost
                    {
                        _id = doc._id,
                        createDate = doc.createDate,
                        author = doc.author,
                        title = doc.title,
                        content = doc.content,
                        likes = doc.likes,
                        dislikes = doc.dislikes,
                        tags = doc.tags,
                        comments = doc.comments
                    };
                    posts.posts.Insert(index, post);
                    index++;

                }
                return posts;
            }
            catch(Exception e)
            {
                return null;
            }
        }
    
        // GET: api/Post/5
        [HttpGet("{id}", Name = "Get")]
        public MongoPost Get(string id)
        {
            List<MongoPost> posts = new List<MongoPost>();
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var mongoId = new ObjectId(id);
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var list = col.Find(query).ToList();
            var index = 0;
            foreach (var doc in list)
            {
                var post = new MongoPost
                {
                    _id = doc._id,
                    createDate = doc.createDate,
                    author = doc.author,
                    title = doc.title,
                    content = doc.content,
                    likes = doc.likes,
                    dislikes = doc.dislikes,
                    tags = doc.tags,
                    comments = doc.comments
                };
                posts.Insert(index, post);
                index++;

            }



            return posts[0];

        }

        // POST: api/Post

        [HttpPost]
        public void Post([FromBody] NewPostModel model)
        {
            //var blogContext = new BlogContext();
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var user = HttpContext.User.Identity.Name; //this.User.Identity.Name;

            if (user == null) user = "nobody";
            var post = new MongoPost
            {
                author = user,
                title = model.Title,
                content = model.Content,    
                createDate = new BsonDateTime(DateTime.Now),
                tags = new string[] { "tag" },
                comments = new List<MongoComment>()
            };
            col.InsertOne(post);

           
        }

        // PUT: api/Post/comment?id=string
        //[HttpPut("comment")]
        //[ProducesResponseType(201)]
        //[ProducesResponseType(400)]
        //public async Task<IActionResult> AddComment(string id, [FromBody] Comment value)
        //{
        //    if (value.text == null)
        //    {
        //        return BadRequest();
        //    }

        //    //await _repository.AddProductAsync(product);

        //    //return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        //    var mongoId = new ObjectId(id);
        //    var query = new BsonDocument(new BsonElement("_id", mongoId));
        //    var comment = new MongoComment
        //    {
        //        createUser = User.Identity.Name,
        //        text = value.text,
        //        commentDate = new BsonDateTime(DateTime.Now),
        //        dislikes = 0,
        //        likes = 0

        //    };
        //    var connectionString = Startup.ConnectionString;
        //    var client = new MongoClient(connectionString);
        //    var db = client.GetDatabase("blog");
        //    var col = db.GetCollection<MongoPost>("posts");
        //    await col.UpdateOneAsync(
        //        x => x._id == query,
        //        Builders<MongoPost>.Update.Push(x => x.comments, comment));
        //    return Ok();
        //}

        [HttpPut]
        public async void Put([FromBody]Com comment)
        {
            var mongoId = new ObjectId(comment.id);
            var user = User.Identity.Name;
            if (user == null) user = "nobody";
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var com = new MongoComment
            {
                createUser = user,
                text = comment.comment,
                commentDate = new BsonDateTime(DateTime.Now),
                dislikes = 0,
                likes = 0

            };
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            await col.UpdateOneAsync(
                query,
                Builders<MongoPost>.Update.Push(x => x.comments, com));

        }


        [HttpPut("like")]
        public async Task<IActionResult> LikePost([FromBody]Post post)
        {
            var mongoId = new ObjectId(post._id);
            var user = User.Identity.Name;
            if (user == null) user = "nobody";
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            //var com = new MongoComment
            //{
            //    createUser = user,
            //    text = comment.comment,
            //    commentDate = new BsonDateTime(DateTime.Now),
            //    dislikes = 0,
            //    likes = 0

            //};
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc("likes", 1);
            await col.UpdateOneAsync(query, updateDef);
            return Ok();


        }

        [HttpPut("dislike")]
        public async Task<IActionResult> DisLikePost([FromBody]Post post)
        {
            var mongoId = new ObjectId(post._id);
            var user = User.Identity.Name;
            if (user == null) user = "nobody";
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            //var com = new MongoComment
            //{
            //    createUser = user,
            //    text = comment.comment,
            //    commentDate = new BsonDateTime(DateTime.Now),
            //    dislikes = 0,
            //    likes = 0

            //};
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc("dislikes", 1);
            await col.UpdateOneAsync(query, updateDef);
            return Ok();


        }

        [HttpPut("likecomment")]
        public async Task<IActionResult> LikeComment([FromBody]CommentLikeModel post)
        {
            var mongoId = new ObjectId(post.id);
            var user = User.Identity.Name;
            if (user == null) user = "nobody";
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var fieldName = string.Format("comments.{0}.likes", post.index);
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc(fieldName, 1);
            await col.UpdateOneAsync(query, updateDef);
            return Ok();


        }

        [HttpPut("dislikecomment")]
        public async Task<IActionResult> DisLikeComment([FromBody]CommentLikeModel post)
        {
            var mongoId = new ObjectId(post.id);
            var user = User.Identity.Name;
            if (user == null) user = "nobody";
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var fieldName = string.Format("comments.{0}.dislikes", post.index);
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc(fieldName, 1);
            await col.UpdateOneAsync(query, updateDef);
            return Ok();


        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }



        //[HttpPost]
        //public async Task<ActionResult> CommentLike(CommentLikeModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return RedirectToAction("Post", new { id = model.PostId });
        //    }

        //    var blogContext = new BlogContext();

        //    // XXX WORK HERE
        //    // Increment the Likes field for the comment at {model.Index}
        //    // inside the post {model.PostId}.
        //    //
        //    // NOTE: The 2.0.0 driver has a bug in the expression parser and 
        //    // might throw an exception depending on how you solve this problem. 
        //    // This is documented here along with a workaround:
        //    // https://jira.mongodb.org/browse/CSHARP-1246

        //    var fieldName = string.Format("Comments.{0}.Likes", model.Index);

        //    UpdateDefinition<Post> updateDef = Builders<Post>.Update.Inc(fieldName, 1);

        //    await blogContext.Posts.UpdateOneAsync(x => x._id == model.PostId, updateDef);

        //    return RedirectToAction("Post", new { id = model.PostId });
        //}
    }
}
