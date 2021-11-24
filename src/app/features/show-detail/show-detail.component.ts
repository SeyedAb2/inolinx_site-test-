import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { GeneralService, ShowDetailService } from 'src/app/services/index.service';
import { MagezineDetail, Profile, ShowDetail } from 'src/app/shared/interfaces/index.interface';
import { environment } from 'src/environments/environment';
import { fadePost } from 'src/app/shared/animation/animation';



@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
  animations:[
    fadePost
  ]
})
export class ShowDetailComponent implements OnInit,OnDestroy {
  readonly imgPath = environment.BaseMediaPath;
  public loading = true;
  subscriptions?:Subscription;
  stickyController?:boolean;
  postID?:any;
  magName?:string;
  magDetail?:MagezineDetail;
  authName?:string;
  authDetail?:Profile;
  data?:ShowDetail;
  //title?:string;
  //l?:string;
  @HostListener('window:scroll',['$event']) onscroll(){
      if(window.scrollY > 5){
        this.stickyController = true;
      }
      else{
        this.stickyController = false;
      }
  }
  constructor(private location: Location,
              private router:ActivatedRoute,
              private route:Router,
              private showDetail:ShowDetailService,
              private Title:Title,
              private Meta:Meta,
              public General:GeneralService) { }
  onActivate(event: any) {
    window.scroll(0,0);
  }
  ngOnInit(): void {
    
    this.magName = this.router.snapshot.params.name;
    this.postID = this.router.snapshot.params.postId;
    //this.title = this.router.snapshot.params.title;
    this.subscriptions = this.showDetail.getDetail(this.magName,this.postID).subscribe(
      (data) => {
        setTimeout(()=>{this.loading = false},500)
        this.authName = data.author?.username;
        this.data = data;
        if(this.authName != null){
          this.showDetail.getAuthor(this.authName).subscribe(data => this.authDetail = data)
        }
        this.showDetail.getMagezine(this.magName).subscribe(data => this.magDetail = data)
        
        this.Title.setTitle(`اینولینکس | ${this.data.title}`);
        this.Meta.updateTag({name:'author' , content:`${this.authDetail?.username}`})
        this.Meta.updateTag({name: 'keywords', content:`${this.data.title},${this.data.publish_date},${this.data.magazine.username}`});
        this.Meta.updateTag({name: 'description', content: `${this.data.text}`})
        this.Meta.updateTag({property:'og:title' , content:`${this.data.title}`})
        this.Meta.updateTag({property:'og:author' , content:`${this.authDetail?.username}`})
        this.Meta.updateTag({property:'og:description' , content: `${this.data.text}`})
        this.Meta.updateTag({property:'og:keywords' , content:`${this.data.title},${this.data.publish_date},${this.data.magazine.username}`});
        if(this.General.RegEx(this.data.title) !== this.router.snapshot.params.title){
          this.route.navigate([`/katibe/${this.magName}/negare/${this.postID}/${this.General.RegEx(this.data.title)}`])
        }
        
      },
      (error)=>{
        if(this.data?.slug !== this.postID && error === 404){
          this.route.navigate([`/katibe/${this.magName}/negare/`])
        }
        if(this.data?.magazine.username !== this.magName && error === 404){
          this.route.navigate([`/katibe/${this.magName}`])
        }
      }
    )
  }
  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }
}
