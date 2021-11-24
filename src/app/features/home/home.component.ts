import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService, HomeService } from 'src/app/services/index.service';
import { ArticlePost } from 'src/app/shared/interfaces/index.interface';
import { environment } from '../../../environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { fadePost } from 'src/app/shared/animation/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    fadePost
  ]
})
export class HomeComponent implements OnInit , OnDestroy {
  public loading = false;
  public errorStatus = false;
  readonly baseUrl = environment.BaseApiUrl;
  readonly imgPath = environment.BaseMediaPath;
  imgLoad:boolean = false;
  AllPost?:ArticlePost[];
  subscriptions?:Subscription;
  constructor(private ArticlePost: HomeService,
              private Title:Title,
              private Meta:Meta,
              public General:GeneralService,
              ) {}
  onActivate(event: any) {
    window.scroll(0,0);
  }
  loadImage(){
    this.imgLoad = true;
  }
  
  ngOnInit(): void {
    this.loading = true
     this.subscriptions = this.ArticlePost.getAllMagezinePost().subscribe(
      (data) =>{
        setTimeout(()=>{this.loading = false},500)
        this.AllPost = data.results;
        this.Title.setTitle('اینولینکس | inolinX');
        this.Meta.updateTag({name: 'keywords', content: 'اینولینکس,کارآفرینی,توسعه نوآوری,کسب و کار,فناوری,صفحه اصلی,خانه'});
        this.Meta.updateTag({name: 'description', content: 'دریافت اطلاعات درباره کسب وکار و توسعه نوآوری را میتوانید از سایت اینولینکس بدست آورید'})
        this.Meta.updateTag({name:'author' , content:'مسعودآقایی ساداتی'})
        this.Meta.updateTag({property:'og:title' , content:'اینولینکس | inolinX'})
        this.Meta.updateTag({property:'og:image:width' , content:'500'})
        this.Meta.updateTag({property:'og:image:height' , content:'500'})
        this.Meta.updateTag({property:'og:image' , content:'http://dev.inolinx.com/assets/image/1.png'})
        this.Meta.updateTag({property:'og:description' , content: 'دریافت اطلاعات درباره کسب وکار و توسعه نوآوری را میتوانید از سایت اینولینکس بدست آورید'})
        this.Meta.updateTag({property:'og:keywords' , content: 'اینولینکس,کارآفرینی,توسعه نوآوری,کسب و کار,فناوری,صفحه اصلی,خانه'});
        this.Meta.updateTag({property:'og:author' , content:'مسعودآقایی ساداتی'});
      },
      (error) =>{
        if(error === 404){
          setTimeout(()=>{this.loading = false},500)
          this.errorStatus = true;
        }
      })
      
  }
  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }
}
