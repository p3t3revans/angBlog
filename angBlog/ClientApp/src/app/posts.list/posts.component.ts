import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { DataService } from '../core/services/data.service';
import { IPost, Posts } from '../shared/interface';
//import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'cm-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  title: string;
  filterText: string;
  posts: IPost[] = [];
  filteredPosts: IPost[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords: number;
  pageSize = 8;
  postURL: string;
  public returnData: Posts;

  constructor(private http: HttpClient,
   //private filterService: FilterService,
    private logger: LoggerService, @Inject('BASE_URL') baseUrl: string
  ) {
    this.postURL = baseUrl + 'api/Post';
  }
  ngOnInit() {
    this.title = 'Posts';
    this.filterText = 'Filter Posts:';
    this.displayMode = DisplayModeEnum.Card;

    this.getPostsPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getPostsPage(page);
  }

  getPostsPage(page: number) {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    let params = new HttpParams().set('page', page.toString()).set('limit', this.pageSize.toString());
    const options = { params: params, headers: headers };
    
    this.http.get<Posts>(this.postURL + '/GetPosts', options).subscribe(result => {

      this.filteredPosts = this.posts = result.posts;
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
