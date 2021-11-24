import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SingleMagezineService } from 'src/app/services/index.service';
import { fadePost, fader, opacity } from 'src/app/shared/animation/animation';
import { Category, MagezineDetail } from 'src/app/shared/interfaces/index.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [fadePost,opacity]
})
export class PostsComponent implements OnInit,OnDestroy {
   readonly imgPath = environment.BaseMediaPath;
   public loading = true;
   subscriptions?:Subscription;
   catID:number = 1; // all posts id
   magDetail?:MagezineDetail;
   magName?:string;
   imgLoad:boolean = false;
   categories:any;
  constructor(private magService:SingleMagezineService,
             private Title:Title,
             private Meta:Meta) {}
  
  onActivatePage(event: any) {
    window.scroll(0,0);
  }
  catSlug(slug:number){
    this.magService.categoryName.next(slug);
  }
  onCatActive(event:any){
   window.scroll(390,420);
  }
  callTwoMethod(event:any,slug:number){
     this.onCatActive(event);
     this.catSlug(slug);
     //console.log(slug)
  }
  loadImage(){
    this.imgLoad = true;
  }
  ngOnInit(): void {
   this.magService.singleMagezineName.subscribe(name=>this.magName=name)
   this.catSlug(this.catID)
   this.subscriptions = this.magService.singleMagezineData.subscribe(
      (data)=>{
        setTimeout(()=>{this.loading = false},500)
        this.magDetail = data;
        this.magService.getCategory(this.magName).subscribe(data => {this.categories = data.categories;this.magService.categoryData.next(data.categories)})
        this.Title.setTitle(`اینولینکس | ${this.magDetail?.name} : نگارخانه`);
        this.Meta.updateTag({name:'author' , content:`${this.magDetail?.name}`})
        this.Meta.updateTag({name: 'keywords', content:`${this.magDetail?.slogan},${this.magDetail?.name},${this.magDetail?.username}`});
        this.Meta.updateTag({name: 'description', content: `${this.magDetail?.description}`})
        this.Meta.updateTag({property:'og:title' , content:`${this.magDetail?.name} : نگارخانه`})
        this.Meta.updateTag({property:'og:author' , content:`${this.magDetail?.name}`})
        this.Meta.updateTag({property:'og:description' , content: `${this.magDetail?.description}`})
        this.Meta.updateTag({property:'og:keywords' , content:`${this.magDetail?.slogan},${this.magDetail?.name},${this.magDetail?.username}`});
      }
   )
  }
  
  ngOnDestroy(){
   this.subscriptions?.unsubscribe();
  }
}
