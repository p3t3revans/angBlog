import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/listposts' },
  { path: 'posts/:id', loadChildren: 'app/post/post.module#PostModule' },
 { path: 'addpost', loadChildren: 'app/post.add/post.module#PostModule' },
  //{ path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: 'listposts', loadChildren: 'app/posts.list/posts.module#PostsModule' },
  { path: '**', pathMatch: 'full', redirectTo: '/listposts' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
