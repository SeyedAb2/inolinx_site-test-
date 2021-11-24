import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GeneralService, SingleMagezineService } from 'src/app/services/index.service';
import { opacity, fadePost } from 'src/app/shared/animation/animation';
import { ArticlePostSingleMagezine, MagezineDetail } from 'src/app/shared/interfaces/index.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-center-dyPost',
  templateUrl: './center-dyPost.component.html',
  styleUrls: ['./center-dyPost.component.scss'],
  animations: [opacity,fadePost]
})
export class CenterDyPostComponent implements AfterContentInit , OnInit , OnDestroy{
  readonly imgPath = environment.BaseMediaPath;
  public loading = true;
  imgLoad:boolean = false;
  subscriptions?:Subscription[] = [];
  magName!:string;
  catID!:number;
  posts?:ArticlePostSingleMagezine[];
  ArticlePosts?:ArticlePostSingleMagezine[];
  MageDetail?:MagezineDetail;
  constructor(private magService:SingleMagezineService,
              private Title:Title,
              private Meta:Meta,
              public General:GeneralService){}
  ngOnInit(){
    this.subscriptions?.push(this.magService.singleMagezineName.subscribe((data)=>{setTimeout(()=>{this.loading = false},500);this.magName=data}))
    this.subscriptions?.push(this.magService.getSingleMagezinePost(this.magName).subscribe((data)=>{this.ArticlePosts = data.results;}))
    this.subscriptions?.push(this.magService.singleMagezineData.subscribe((data)=>{
      this.MageDetail = data;
      this.Title.setTitle(`اینولینکس | ${this.MageDetail?.name} : نگارخانه`);
        this.Meta.updateTag({name:'author' , content:`${this.MageDetail?.name}`})
        this.Meta.updateTag({name: 'keywords', content:`${this.MageDetail?.slogan},${this.MageDetail?.name},${this.MageDetail?.username}`});
        this.Meta.updateTag({name: 'description', content: `${this.MageDetail?.description}`})
        this.Meta.updateTag({property:'og:title' , content:`${this.MageDetail?.name} : نگارخانه`})
        this.Meta.updateTag({property:'og:author' , content:`${this.MageDetail?.name}`})
        this.Meta.updateTag({property:'og:description' , content: `${this.MageDetail?.description}`})
        this.Meta.updateTag({property:'og:keywords' , content:`${this.MageDetail?.slogan},${this.MageDetail?.name},${this.MageDetail?.username}`});
    }))
  }
  ngAfterContentInit(){
    this.magService.categoryName.subscribe((data)=>{this.catID=data
      this.magService.getCategorizedPost(this.magName,this.catID).subscribe(
        data => {this.posts = data.results
        console.log(this.posts)
        })
    })
    
  }
  ngOnDestroy(){
    this.subscriptions?.forEach(s => s.unsubscribe())
  }
  onActivatePage(event: any) {
    window.scroll(0,0);
  }
  loadImage(){
    this.imgLoad = true;
  }
}
