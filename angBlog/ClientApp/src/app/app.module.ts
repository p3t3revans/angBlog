import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WeatherAddComponent } from './weather-add/weather-add.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { sharedStylesheetJitUrl } from '@angular/compiler';
//import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,

    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    WeatherAddComponent,
    WeatherDetailComponent//,
    //PostsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'weather', component: WeatherAddComponent },
      { path: 'forecast/:_id', component: WeatherDetailComponent },
      { path: 'forecast/:_id/details', component: WeatherDetailComponent },
      { path: 'forecast/:_id/edit', component: WeatherDetailComponent },
      //{ path: 'posts', component: PostsComponent },
      { path: 'addpost', loadChildren: 'app/post.add/post.module#PostModule' },
      { path: 'listposts', loadChildren: 'app/posts.list/posts.module#PostsModule' },
    //  { path: 'addpost', loadChildren: 'app/customers/customers.module#CustomersModule' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
