import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { PipsModule } from './shared/pips/pips.module';
import { SharedModule } from './shared/components/shared.module';
import { ErrorHandlingInterceptor } from './interceptors/errorHandling.interceptor';
import { PortalModule } from '@angular/cdk/portal';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    PipsModule,
    SharedModule.forRoot(),
    PortalModule,
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: ErrorHandlingInterceptor,multi:true},
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
