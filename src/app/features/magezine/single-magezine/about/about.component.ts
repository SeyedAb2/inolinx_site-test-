import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/internal/Subscription';
import { SingleMagezineService } from 'src/app/services/single-magezine.service';
import { fadePost, opacity } from 'src/app/shared/animation/animation';
import { Location } from '@angular/common';
import { InfoMagazine, MagezineDetail } from 'src/app/shared/interfaces/index.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations:[
    fadePost,
    opacity
  ]
})
export class AboutComponent implements OnInit,OnDestroy {
  public loading = true;
  subscriptions?:Subscription;
  magDetail?:MagezineDetail;
  info?:InfoMagazine;
  constructor(private MagService: SingleMagezineService,
    private Title:Title,
    private Meta:Meta,
    private Location:Location,
    private router:Router,
    private routerActive:ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.subscriptions = this.MagService.singleMagezineData.subscribe(
      (data) => {
        // if(this.routerActive.snapshot.routeConfig?.path !== 'about'){
        //   this.router.navigate([`/katibe/${data.username}/about`])
        //   console.log(this.routerActive.snapshot.routeConfig?.path)
        // }
        setTimeout(()=>{this.loading = false},500)
        this.magDetail = data;
        this.subscriptions = this.MagService.getSingleMagezineInfo(data.username).subscribe(info => {this.info = info})
        this.Title.setTitle(`اینولینکس | ${this.magDetail?.name} : درباره`);
        this.Meta.updateTag({name:'author' , content:`${this.magDetail?.name}`})
        this.Meta.updateTag({name: 'keywords', content:`${this.magDetail?.slogan},${this.magDetail?.name},${this.magDetail?.username}`});
        this.Meta.updateTag({name: 'description', content: `${this.magDetail?.description}`})
        this.Meta.updateTag({property:'og:title' , content:`${this.magDetail?.name} : درباره`})
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
