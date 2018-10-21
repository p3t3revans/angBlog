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
//import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent
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
      //{ path: 'posts', component: PostsComponent },
      { path: 'addpost', loadChildren: 'app/post.add/post.module#PostModule' },
      { path: 'listposts', loadChildren: 'app/posts.list/posts.module#PostsModule' },
      { path: 'posts/:id', loadChildren: 'app/post/post.module#PostModule' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
