import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { GeneralService, ProfileService } from 'src/app/services/index.service';
import { fadePost } from 'src/app/shared/animation/animation';
import { Profile, ProfileAllPost } from 'src/app/shared/interfaces/index.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations:[
    fadePost
  ]
})
export class ProfileComponent implements OnInit,OnDestroy {
  readonly imgPath = environment.BaseMediaPath;
  public loading = true;
  imgLoad:boolean = false;
  subscription: Subscription[] = [];
  stickyController?:boolean;
  profileName:string;
  Profile?:Profile;
  AllPost?:ProfileAllPost[];
  @HostListener('window:scroll',['$event']) onscroll(){
      if(window.scrollY > 425){
        this.stickyController = true;
      }
      else{
        this.stickyController = false;
      }
  }
  constructor(private profileService: ProfileService,
              private router:ActivatedRoute,
              private Title:Title,
              private Meta:Meta,
              public General:GeneralService) {
                this.profileName = this.router.snapshot.params.user;
              }
  
  ngOnInit(): void {
    this.subscription.push(this.profileService.getProfile(this.profileName).subscribe((data)=> {
      setTimeout(()=>{this.loading = false},500)
      this.Profile = data;
      this.Title.setTitle(`اینولینکس | ${this.Profile.first_name} ${this.Profile.last_name}`);
      this.Meta.updateTag({name:'author' , content:`${this.Profile.username}`})
      this.Meta.updateTag({name: 'keywords', content:`${this.Profile.username},نویسنده,صفحه شخصی,پروفایل`});
      this.Meta.updateTag({name: 'description', content: `${this.Profile.profile_text}`})
      this.Meta.updateTag({property:'og:title' , content:`اینولینکس | ${this.Profile.first_name} ${this.Profile.last_name}`})
      this.Meta.updateTag({property:'og:author' , content:`${this.Profile.first_name} ${this.Profile.last_name}`})
      this.Meta.updateTag({property:'og:description' , content: `${this.Profile.profile_text}`})
      this.Meta.updateTag({property:'og:keywords' , content:`${this.Profile.first_name} ${this.Profile.last_name},${this.Profile.username},نویسنده,صفحه شخصی,پروفایل`});
    }))
    this.subscription.push(this.profileService.getProfileAllPost(this.profileName).subscribe((data)=>{this.AllPost = data.results}))
    
  }
  ngOnDestroy(){
    this.subscription.forEach(s=>s.unsubscribe())
  }
  loadImage(){
    this.imgLoad = true;
  }
  onActivate(event: any) {
    window.scroll(0,0);
  }
}
