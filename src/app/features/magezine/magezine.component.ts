import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GeneralService, MagezineService } from 'src/app/services/index.service';
import { fadePost } from 'src/app/shared/animation/animation';
import { MagezineDetail } from 'src/app/shared/interfaces/index.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-magezine',
  templateUrl: './magezine.component.html',
  styleUrls: ['./magezine.component.scss'],
  animations:[
    fadePost
  ]
})
export class MagezineComponent implements OnInit , OnDestroy {
  readonly imgPath = environment.BaseMediaPath;
  public loading = false;
  AllMagezine?:MagezineDetail[];
  subscriptions?:Subscription;
  imgLoad:boolean = false;
  constructor(private Router:Router,
              private activatedRoute:ActivatedRoute,
              private Magezine:MagezineService,
              private Title:Title,
              private Meta:Meta,
              public General:GeneralService,
              private toastr: ToastrService) {}
  ngOnInit(): void {
    
    this.loading = true;
    this.subscriptions = this.Magezine.getAllMagezine().subscribe(
      (data) =>{
        setTimeout(()=>{this.loading = false},500)
        this.AllMagezine = data.results;
        this.Title.setTitle('اینولینکس | مجلات');
        this.Meta.updateTag({name: 'keywords', content: 'کتیبه,مجلات,مجله ها'});
        this.Meta.updateTag({name: 'description', content: 'مجموعه مجلات ثبت شده در اینولینکس نمایش داده میشود برای نمایش مجله مدنظر خودرا انتخاب کنید'})
        this.Meta.updateTag({property:'og:title' , content:'اینولینکس | مجلات'})
        this.Meta.updateTag({property:'og:description' , content: 'مجموعه مجلات ثبت شده در اینولینکس نمایش داده میشود برای نمایش مجله مدنظر خودرا انتخاب کنید'})
        this.Meta.updateTag({property:'og:keywords' , content: 'کتیبه,مجلات,مجله ها'});
      },
      (error) => {
        console.log('ارور مربوطه :',error)
      })
  }
  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }
  onActivate(event: any) {
    window.scroll(0,0);
  }
  loadImage(){
    this.imgLoad = true;
  }
  // singleNav(){
  //   this.Router.navigate(['mag1'], {relativeTo: this.activatedRoute})
  // }

}
