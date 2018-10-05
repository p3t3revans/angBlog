using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ngTest.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Globalization;

namespace ngTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        // GET: api/Weather
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> GetWeather()
        {
            List<WeatherForecast> forecasts = new List<WeatherForecast>();
            var client = new MongoClient();
            var db = client.GetDatabase("weather");
            var col = db.GetCollection<MongoForecast>("forecasts");

            var list = col.Find(new BsonDocument()).ToList();
            var index = 0;
            foreach (var doc in list)
            {
                var forecast = new WeatherForecast
                {
                    _id = doc._id,
                    DateFormatted = doc.date.ToString(),
                    TemperatureC = doc.tempC,
                    Summary = doc.summary
                };
                //yield return forecast;
                forecasts.Insert(index, forecast);

            }
            return forecasts;

        }

        //public IEnumerable<WeatherForecast> post()
        //{
        //    List<WeatherForecast> forecasts = new List<WeatherForecast>();
        //    var client = new MongoClient();
        //    var db = client.GetDatabase("weather");
        //    var col = db.GetCollection<Forecast>("forecasts");

        //    var list = col.Find(new BsonDocument()).ToList();
        //    var index = 0;
        //    foreach (var doc in list)
        //    {
        //        var forecast = new WeatherForecast
        //        {
        //            DateFormatted = doc.date.ToString(),
        //            TemperatureC = doc.tempC,
        //            Summary = doc.summary
        //        };
        //        //yield return forecast;
        //        forecasts.Insert(index, forecast);

        //    }
        //    return forecasts;

        //}
        // GET: api/Weather/5
        [HttpGet("{id}", Name = "GetWeather")]
        public WeatherForecast Get(string id)
        {
            List<WeatherForecast> forecasts = new List<WeatherForecast>();
            var client = new MongoClient();
            var db = client.GetDatabase("weather");
            var col = db.GetCollection<MongoForecast>("forecasts");
            var mongoId = new ObjectId(id);
            var query = new BsonDocument(new BsonElement("_id", mongoId));
            var list = col.Find(query).ToList();
            var index = 0;
            foreach (var doc in list)
            {
                var forecast = new WeatherForecast
                {
                    _id = doc._id,
                    DateFormatted = doc.date.ToString(),
                    TemperatureC = doc.tempC,
                    Summary = doc.summary
                };
                //yield return forecast;
                forecasts.Insert(index, forecast);

            }
    
               

            return forecasts[0];

        }
        //[HttpPost]
        //[ProducesResponseType(400)]
        //public async Task<ActionResult<Forecast>> CreateAsync(Forecast fore)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var blogContext = new BlogContext();


        //    await blogContext.Forecasts.InsertOneAsync(fore);
        //    return fore;

            
        //}

        // POST: api/Weather
        [HttpPost]
        public void Post([FromBody] Forecast value)
        {
            MongoForecast values = new MongoForecast();
            //var values = new Forecast();
            BlogContext blogContext = new BlogContext();
            //DateTime NewDate = DateTime.ParseExact(value.date, "MM/DD/YYYY",
            //                                        CultureInfo.InvariantCulture);
            values.date = new BsonDateTime(DateTime.Parse(value.date));
            values.tempC = value.tempC;
            values.summary = value.summary;
            try
            {
                blogContext.MongoForecasts.InsertOne(values);
            }
            catch (Exception err)
            {
                Console.WriteLine(err);
            }
        }

        // PUT: api/Weather/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Forecast value)
        {
            //var values = new Forecast();
            var blogContext = new BlogContext();
            //value.date = new BsonDateTime(DateTime.Now);
            value.tempC = 30;
            value.summary = "hot";
            try
            {
                blogContext.Forecasts.InsertOne(value);
            }
            catch (Exception err)
            {
                Console.WriteLine(err);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
