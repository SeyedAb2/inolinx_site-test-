import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MbtiComponent } from './mbti/mbti.component';
import { QuizComponent } from './quiz.component';



const routes: Routes = [
  {path: '', component:QuizComponent},
  {path: 'mbti', component:MbtiComponent ,data : {animation: 'mbti'}},
];
//
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class QuizRoutingModule { 
  
}
