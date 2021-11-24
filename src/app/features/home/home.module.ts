import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PipsModule } from 'src/app/shared/pips/pips.module';
import { SharedModule } from 'src/app/shared/components/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,   
    AngularMaterialModule,
    PipsModule,
    SharedModule,
    
  ]
})
export class HomeModule { }
