import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  stickyController?:boolean;
  constructor() { }
  @HostListener('window:scroll',['$event']) onscroll(){
      if(window.scrollY > 5){
        this.stickyController = true;
      
      }
      else{
        this.stickyController = false;
      }
  }
  onActivate(event: any) {
    window.scroll(0,0);
    //document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
  ngOnInit() {
  }

}
