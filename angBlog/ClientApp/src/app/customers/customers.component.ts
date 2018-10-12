import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { DataService } from '../core/services/data.service';
import { Forecast, WeatherForecast,WeatherForecasts } from '../shared/interface';
//import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'cm-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  forecasts: WeatherForecast[]=[];
  filteredForecasts: WeatherForecast[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords: number;
  pageSize = 8;
  weatherURL: string;
  public returnData: WeatherForecasts;

  constructor(private http: HttpClient,
   //private filterService: FilterService,
    private logger: LoggerService, @Inject('BASE_URL') baseUrl: string
  ) {
    this.weatherURL = baseUrl + 'api/Weather';
  }
  ngOnInit() {
    this.title = 'Forecasts';
    this.filterText = 'Filter Forecasts:';
    this.displayMode = DisplayModeEnum.Card;

    this.getCustomersPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getCustomersPage(page);
  }

  getCustomersPage(page: number) {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    let params = new HttpParams().set('page', page.toString()).set('limit', this.pageSize.toString());
    const options = { params: params, headers: headers };
    
    this.http.get<WeatherForecasts>(this.weatherURL + '/GetWeather', options).subscribe(result => {

      this.filteredForecasts = this.forecasts = result.forecasts;
      this.totalRecords = result.count;
      
    }, error => console.error(error));
  }
  

  filterChanged(data: string) {
    //if (data && this.forecasts) {
    //    data = data.toUpperCase();
    //  const props = ['firstName', 'lastName', 'city', 'state.name'];
    //  this.filteredForecasts = this.filterService.filter<Forecast>(this.forecasts, data, props);
    //} else {
    //  this.filteredForecasts = this.forecasts;
    //}
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
