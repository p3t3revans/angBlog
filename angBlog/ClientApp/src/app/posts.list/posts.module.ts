import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [PostsRoutingModule, SharedModule],
  declarations: [PostsRoutingModule.components]
})
export class PostsModule { }
