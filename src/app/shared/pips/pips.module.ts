import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordCounterPipe } from './word-counter.pipe';



@NgModule({
  declarations: [
    WordCounterPipe
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    WordCounterPipe
  ]
})
export class PipsModule { }
