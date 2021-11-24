import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-mbti',
  templateUrl: './mbti.component.html',
  styleUrls: ['./mbti.component.scss']
})
export class MbtiComponent implements OnInit {
  pernum:number = 0;
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
  up(e:any){
    this.pernum = e*10
  }
  ngOnInit() {
    
  }

}
