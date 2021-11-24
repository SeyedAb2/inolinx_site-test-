import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './notFound/notFound.component';
import { NotInternetComponent } from './notInternet/notInternet.component';
import { ReportDialogComponent } from './reportDialog/reportDialog.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AfterSendMassageComponent } from './reportDialog/afterSendMassage/afterSendMassage.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    NotInternetComponent,
    ReportDialogComponent,
    AfterSendMassageComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    LoadingComponent,
    NotFoundComponent,
    NotInternetComponent,
  ]
})
export class SharedModule { 
  static forRoot() {
    return {
      ngModule: SharedModule
    }
  }
}
