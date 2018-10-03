using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using MongoDB.Driver;

namespace ngTest.Models
{
    public class BlogContext
    {
        public const string CONNECTION_STRING_NAME = "weather";
        public const string DATABASE_NAME = "weather";
        public const string POSTS_COLLECTION_NAME = "forecasts";
        public const string USERS_COLLECTION_NAME = "users";

        // This is ok... Normally, they would be put into
        // an IoC container.
        private static readonly IMongoClient _client;
        private static readonly IMongoDatabase _database;

        static BlogContext()
        {
            //var connectionString = ConfigurationManager.ConnectionStrings[CONNECTION_STRING_NAME].ConnectionString;
            _client = new MongoClient();
            _database = _client.GetDatabase(DATABASE_NAME);
        }

        public IMongoClient Client
        {
            get { return _client; }
        }

        public IMongoCollection<Forecast> Forecasts
        {
            get { return _database.GetCollection<Forecast>(POSTS_COLLECTION_NAME); }
        }
        public IMongoCollection<MongoForecast> MongoForecasts
        {
            get { return _database.GetCollection<MongoForecast>(POSTS_COLLECTION_NAME); }
        }

    }
}