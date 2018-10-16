import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './posts.component';
import { PostsCardComponent } from './posts-card.component';
import { PostsGridComponent } from './posts-grid.component';

const routes: Routes = [
  { path: '', component: PostsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PostsRoutingModule {
  static components = [ PostsComponent, PostsCardComponent, PostsGridComponent ];
}
