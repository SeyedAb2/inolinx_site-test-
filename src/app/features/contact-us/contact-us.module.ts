import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class ContactUsModule { }
