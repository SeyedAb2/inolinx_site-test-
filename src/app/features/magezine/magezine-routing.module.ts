import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/components/notFound/notFound.component';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { MagezineComponent } from './magezine.component';
import { AboutComponent } from './single-magezine/about/about.component';
import { PostsComponent } from './single-magezine/posts/posts.component';
import { SingleMagezineComponent } from './single-magezine/single-magezine.component';

const routes: Routes = [
  {path: '', component:MagezineComponent},
  {path: ':name', component:SingleMagezineComponent , data : {animation: 'single-mag'} ,children:[
    {path: '', redirectTo: 'negare' , pathMatch:'full', data : {animation: 'single-mag'}},
    {path: 'negare', component:PostsComponent,data : {animation: 'single-mag-posts'}},
    {path: 'about', component:AboutComponent,data : {animation: 'single-mag-about'}},
    //{path: '**', pathMatch:'full' ,redirectTo: 'not-found' , data : {animation: 'not-found'}}
  ]},
  {path: ':name/negare/:postId/:title', component:ShowDetailComponent,data : {animation: 'show-detail'}},
  {path: ':name/negare', pathMatch:'full' ,redirectTo: ':name' , data : {animation: 'back-single-mag'}},
  {path: 'not-found', component:NotFoundComponent,data : {animation: 'not-found'}},
  {path: '**', pathMatch:'full' ,redirectTo: 'not-found' , data : {animation: 'not-found'}}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagezineRoutingModule { }
