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
                        comments = doc.comments,
                        images = doc.images
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
            ObjectId mongoId = new ObjectId(id);
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
                    comments = doc.comments,
                    images = doc.images
                };
                posts.Insert(index, post);
                index++;

            }
            return posts[0];
        }

        // POST: api/Post

        [HttpPost]
        public async Task<IApiResponse> Post([FromBody] NewPostModel model)
        {
            IApiResponse status = new IApiResponse();
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
                images = model.Images,
                createDate = new BsonDateTime(DateTime.Now),
                tags = new string[] { "tag" },
                comments = new List<MongoComment>()
            };
            await col.InsertOneAsync(post);
            status.status = true;
            if (status.status) status.error = "200";
            return status;

        }
       
        [HttpPut]
        public async Task<IApiResponse> Put([FromBody]Com comment)
        {
            IApiResponse status = new IApiResponse();
            ObjectId mongoId = new ObjectId(comment.id);
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
            UpdateResult result = await col.UpdateOneAsync(
                query,
                Builders<MongoPost>.Update.Push(x => x.comments, com));
            status.status = result.IsAcknowledged;
            if (status.status) status.error = "200";
            return status;

        }


        [HttpPut("like")]
        public async Task<IApiResponse> LikePost([FromBody]Post post)
        {
            IApiResponse status = new IApiResponse();
            ObjectId mongoId = new ObjectId(post._id);
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc("likes", 1);
            UpdateResult result = await col.UpdateOneAsync(query, updateDef);
            status.status = result.IsAcknowledged;
            if (status.status) status.error = "200";
            return status;
        }

        [HttpPut("dislike")]
        public async Task<IApiResponse> DisLikePost([FromBody]Post post)
        {
            IApiResponse status = new IApiResponse();
            ObjectId mongoId = new ObjectId(post._id);
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc("dislikes", 1);
            UpdateResult result = await col.UpdateOneAsync(query, updateDef);
            status.status = result.IsAcknowledged;
            if (status.status) status.error = "200";
            return status;
        }

        [HttpPut("likecomment")]
        public async Task<IApiResponse> LikeComment([FromBody]CommentLikeModel post)
        {
            IApiResponse status = new IApiResponse();
            ObjectId mongoId = new ObjectId(post.id);
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var fieldName = string.Format("comments.{0}.likes", post.index);
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc(fieldName, 1);
            UpdateResult result = await col.UpdateOneAsync(query, updateDef);
            status.status = result.IsAcknowledged;
            if (status.status) status.error = "200";
            return status;
        }

        [HttpPut("dislikecomment")]
        public async Task<IApiResponse> DisLikeComment([FromBody]CommentLikeModel post)
        {
            IApiResponse status = new IApiResponse();
            ObjectId mongoId = new ObjectId(post.id);
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var fieldName = string.Format("comments.{0}.dislikes", post.index);
            UpdateDefinition<MongoPost> updateDef = Builders<MongoPost>.Update.Inc(fieldName, 1);
            UpdateResult result = await col.UpdateOneAsync(query, updateDef);
            status.status = result.IsAcknowledged;
            if (status.status) status.error = "200";
            return status;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }



        
    }
}
