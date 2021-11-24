import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { MbtiComponent } from './mbti/mbti.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [QuizComponent,MbtiComponent]
})
export class QuizModule { }
