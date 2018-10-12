import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather-add',
  templateUrl: './weather-add.component.html',
  styleUrls: ['./weather-add.component.css']
})
export class WeatherAddComponent implements OnInit {
  addForm: FormGroup;
  forecast: Forecast =
    {
      date: '',
      tempC: 0,
      summary: ''
    }
  operationText = 'Submit';
  weatherURL = '';
  //http: HttpClient;


  constructor(private http: HttpClient,private formBuilder: FormBuilder,
               @Inject('BASE_URL') baseUrl: string
  ) {
    this.weatherURL = baseUrl + 'api/Weather';
  }

  ngOnInit() {
    this.buildForm();
  }
  submitWeather() {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    this.http.post<Forecast>(this.weatherURL, this.forecast, { headers }).subscribe(result => {
      result;
    }, error => console.error(error));
  }
  buildForm() {
    this.addForm = this.formBuilder.group({
      summary: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tempC: [0, [Validators.required]]
    });
  };
}
interface Forecast {
  date: string;
  tempC: number;
  summary: string;
}
