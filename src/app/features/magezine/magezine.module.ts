import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagezineComponent } from './magezine.component';
import { MagezineRoutingModule } from './magezine-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { SingleMagezineComponent } from './single-magezine/single-magezine.component';
import { AboutComponent } from './single-magezine/about/about.component';
import { PostsComponent } from './single-magezine/posts/posts.component';
import { CenterDyPostComponent } from './single-magezine/posts/center-dyPost/center-dyPost.component';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { PipsModule } from 'src/app/shared/pips/pips.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    MagezineComponent,
    SingleMagezineComponent,
    AboutComponent,
    PostsComponent,
    CenterDyPostComponent,
    ShowDetailComponent
  ],
  imports: [
    CommonModule,
    MagezineRoutingModule,
    AngularMaterialModule,
    PipsModule,
    SharedModule,
  ]
})
export class MagezineModule { }
