import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './posts.component';
import { NewComponent } from './new.component';
//import { CustomersCardComponent } from './customers-card.component';
//import { CustomersGridComponent } from './customers-grid.component';

const routes: Routes = [
  { path: '', component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
  static components = [PostsComponent, NewComponent];
}
