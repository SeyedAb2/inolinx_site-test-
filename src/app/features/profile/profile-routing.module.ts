import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {path: '', component:ProfileComponent,data : {animation: 'profile'}},
  {path: ':postId', component:ShowDetailComponent,data : {animation: 'show-detail'}},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
