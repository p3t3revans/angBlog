using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ngTest.Models;

namespace ngBlog.Models

{
    public class WeatherForecasts
    {
        public int count { set; get; }
        public List<WeatherForecast> forecasts { set; get; }
       
    }
}
