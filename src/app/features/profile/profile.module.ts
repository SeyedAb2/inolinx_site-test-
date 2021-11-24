import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { PipsModule } from 'src/app/shared/pips/pips.module';
import { SharedModule } from 'src/app/shared/components/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ProfileRoutingModule,
    PipsModule,
    SharedModule
  ]
})
export class ProfileModule { }
