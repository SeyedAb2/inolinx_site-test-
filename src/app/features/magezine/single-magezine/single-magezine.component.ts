import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver }  from '@angular/cdk/layout';
import { fadePost, opacity, slide } from 'src/app/shared/animation/animation';
import { GeneralService, SingleMagezineService } from 'src/app/services/index.service';
import { MagezineDetail } from 'src/app/shared/interfaces/magezineDetail.interface';
import { Subscription } from 'rxjs/internal/Subscription';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-magezine',
  templateUrl: './single-magezine.component.html',
  styleUrls: ['./single-magezine.component.scss'],
  animations: [
    opacity,
    slide,
    fadePost
  ]
})
export class SingleMagezineComponent implements OnInit,OnDestroy {
  public loading = true;
  readonly imgPath = environment.BaseMediaPath;
  subscriptions?:Subscription;
  errorEvent:any = {status:NaN,err:true };
  imgLoad:boolean = false;
  name:string = "";
  isShow:boolean = false;
  magezineDetail?:MagezineDetail;
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 560){
      this.isShow = true;
    }
    else{
      this.isShow = false;
    }
  }  
  constructor(private router:ActivatedRoute,
              private MagService:SingleMagezineService,
              private Title:Title,
              private Meta:Meta,
              public General:GeneralService) { }  
  ngOnInit(){
    this.name = this.router.snapshot.params['name'];
    this.MagService.singleMagezineName.next(this.name); 
    this.getMagezineDetail();
  }
  loadImage(){
    this.imgLoad = true;
  }
  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }
  prepareRoute(outlet:RouterOutlet){
    return outlet?.activatedRouteData?.animation;
  }
  onActivate(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  getMagezineDetail(){
    this.subscriptions = this.MagService.getSingleMagezine(this.name).subscribe(
      (data: MagezineDetail) => {
        this.errorEvent.err = false
        setTimeout(()=>{this.loading = false},500)
        this.magezineDetail = data; 
        this.MagService.singleMagezineData.next(this.magezineDetail);
        this.Title.setTitle(`اینولینکس | ${this.magezineDetail.name}`);
        this.Meta.updateTag({name:'author' , content:`${this.magezineDetail.name}`})
        this.Meta.updateTag({name: 'keywords', content:`${this.magezineDetail.slogan},${this.magezineDetail.name},${this.magezineDetail.username}`});
        this.Meta.updateTag({name: 'description', content: `${this.magezineDetail.description}`})
        this.Meta.updateTag({property:'og:title' , content:`${this.magezineDetail.name}`})
        this.Meta.updateTag({property:'og:author' , content:`${this.magezineDetail.name}`})
        this.Meta.updateTag({property:'og:description' , content: `${this.magezineDetail.description}`})
        this.Meta.updateTag({property:'og:keywords' , content:`${this.magezineDetail.slogan},${this.magezineDetail.name},${this.magezineDetail.username}`});
      },
      (error) =>{
        if(error == 404){
          this.errorEvent.status = error;
          this.errorEvent.err = true;
          this.loading = false;
        }
        else if(error ==0 || error == 500){
          this.errorEvent.status = error;
          this.errorEvent.err = true;
          this.loading = false;
        }
      }
    )
  }
}
