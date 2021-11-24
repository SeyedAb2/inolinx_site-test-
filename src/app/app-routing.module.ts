import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/notFound/notFound.component';
import { NotInternetComponent } from './shared/components/notInternet/notInternet.component';



const routes: Routes = [
  {path: '', loadChildren : () => import('./features/home/home.module').then(m => m.HomeModule) , data : {animation: 'home'} },
  {path: 'katibe', loadChildren : () => import('./features/magezine/magezine.module').then(m => m.MagezineModule) , data : {animation: 'magezine'} },
  {path: 'contact-us', loadChildren : () => import('./features/contact-us/contact-us.module').then(m => m.ContactUsModule) , data : {animation: 'contact-us'}},
  {path: 'quiz', loadChildren : () => import('./features/quiz/quiz.module').then(m => m.QuizModule) , data : {animation: 'quiz'}},
  {path: 'hamafarin/:user', loadChildren : () => import('./features/profile/profile.module').then(m => m.ProfileModule) , data : {animation: 'profile'}},
  {path: 'not-found', component:NotFoundComponent ,data : {animation: 'not-found'}},
  {path: 'no-internet', component:NotInternetComponent ,data : {animation: 'not-net'}},
  {path:'**' , redirectTo: 'not-found',  pathMatch:'full'} 
];
//
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
  
})
export class AppRoutingModule { 
  
}
