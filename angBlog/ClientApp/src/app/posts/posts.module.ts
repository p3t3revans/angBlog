import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts.routing.module';

@NgModule({
  imports: [PostsRoutingModule],
  declarations: [PostsRoutingModule.components]
})
export class PostsModule { }
