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
            posts.posts = new List<Post>();
            //var blogContext = new BlogContext();
            var connectionString = Startup.ConnectionString;
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase("blog");
            var col = db.GetCollection<MongoPost>("posts");
            var skip = (int.Parse(page) - 1) * (int.Parse(limit));
            var numberOfForecasts = await col.Find(FilterDefinition<MongoPost>.Empty).CountDocumentsAsync();
            posts.count = (int)numberOfForecasts;
            var recentPosts = await col.Find(FilterDefinition<MongoPost>.Empty)
                                .Skip(skip)
                                .Limit(int.Parse(limit))
                                .Sort(Builders<MongoPost>.Sort.Descending("createDate"))
                                .ToListAsync();
            var index = 0;
            foreach (var doc in recentPosts)
            {
                var post = new Post
                {
                    _id = doc._id,
                    createDate = doc.createDate.ToString(),
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
    
        // GET: api/Post/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
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
            var user = this.User.Identity.Name;

            if (user == null) user = "nobody";
            var post = new MongoPost
            {
                author = user,
                title = model.Title,
                content = model.Content,    
                createDate = new BsonDateTime(DateTime.Now),
                tags = new string[] { "tag" },
                comments = new List<Comment>()
            };
            col.InsertOne(post);

           
        }

        // PUT: api/Post/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
