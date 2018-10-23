import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post.component';
import { PostDetailsComponent } from './post-details.component';
import { PostEditComponent } from './post-edit.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
/*       { path: 'comments', component: PostCommentsComponent }, */
      { path: 'details', component: PostDetailsComponent },
      {
        path: 'edit',
        component: PostEditComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard, CanDeactivateGuard]
})
export class PostRoutingModule {
  static components = [PostComponent, PostDetailsComponent, PostEditComponent];
}

