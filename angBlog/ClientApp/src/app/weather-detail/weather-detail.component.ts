import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Forecast, WeatherForecast } from '../shared/interface';


@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
  detailForm: FormGroup;
  id: string;
  forecast: WeatherForecast;
  weatherURL: string;
  headers = new HttpHeaders().set('content-type', 'application/json');
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.weatherURL = baseUrl + 'api/Weather';
  }


    ngOnInit() {
      this.detailForm = this.fb.group({
        comments: this.fb.array([])
      })
      this.id = this.route.snapshot.paramMap.get('_id');
      this.weatherURL += '/' + this.id;
      if (this.id) {
        this.http.get<WeatherForecast>(this.weatherURL).subscribe(result => {
          this.forecast = result;
        }, error => console.error(error));
      };

      // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
      //this.route.parent.params.subscribe((params: Params) => {
      //  const id = params['id'];
      //  if (id) {
      //    //this.dataService.getPost(id)
      //    //  .subscribe((post: IPost) => {
      //    //    this.post = post;
      //    //    this.post.id = id;
      //    //    if (!this.post.likes) this.post.likes = 0;
      //    //    if (!this.post.dislikes) this.post.dislikes = 0;
      //    //    this.mapEnabled = true;
      // //    // });
      //  }
      //});
    }
 

}
