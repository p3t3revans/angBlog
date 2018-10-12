import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Forecast, WeatherForecast, WeatherForecasts } from '../shared/interface';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[]=[];
  pageSize = 40;
  page = 1;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    let params = new HttpParams().set('page', this.page.toString()).set('limit', this.pageSize.toString());
    const options = { params: params, headers: headers };
    http.get<WeatherForecasts>(baseUrl + 'api/Weather/GetWeather', options
    ).subscribe(result => {
      this.forecasts = result.forecasts;
    }, error => console.error(error));
  }
}
//interface WeatherForecasts {
//  count: number;
//  forecast: WeatherForecast[];
//}
//interface WeatherForecast {
//  dateFormatted: string;
//  temperatureC: number;
//  temperatureF: number;
//  summary: string;
//}
