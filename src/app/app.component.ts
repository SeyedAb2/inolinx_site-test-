import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BreakpointObserver }  from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { fader } from './shared/animation/animation';
import { Location } from '@angular/common';
import { SingleMagezineService } from './services/single-magezine.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ],
})
export class AppComponent implements AfterViewInit ,AfterViewChecked{
   public loading = false;
  @ViewChild (MatSidenav) sidenav!:MatSidenav
  catID:number = 1; // all posts id
  categories:any;
  magName?:string;
  showCat?:boolean;
  constructor(private observer:BreakpointObserver,
    private magService:SingleMagezineService,
    private cdRef:ChangeDetectorRef,
    private routerActive:ActivatedRoute,
    private route: Location,){
       
    }
  prepareRoute(outlet:RouterOutlet){
    return outlet?.activatedRouteData?.animation;
   }
  onActivate(event: any) {
    window.scroll(0,0);
   }
  ngAfterViewInit(){
    this.observer.observe(['(max-width:767px)']).subscribe(
      (res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    )
    this.cdRef.detectChanges()
   }
   ngAfterViewChecked(){
     this.magService.singleMagezineName.subscribe(data => this.magName=data);
     if(this.magName!="" && this.route.path()==`/katibe/${this.magName}/negare`){
        this.showCat = true;
        this.magService.categoryData.subscribe(data => {this.categories = data})
        
     }
     else{
        this.showCat = false;
     }
  }  
   onActivatePage(e: any) {
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
}
