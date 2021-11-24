import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportDialogComponent } from '../shared/components/reportDialog/reportDialog.component';
import { ContactInterface, ReportInterface } from '../shared/interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneralService implements OnInit, OnDestroy{
  readonly basePath = environment.SharePath;
  postID = new BehaviorSubject<string>('');
  href = new BehaviorSubject<string>('');
  subscription:Subscription[] = [];
  constructor(private snackBar:MatSnackBar,
                public Dialog: MatDialog,
                private http:HttpClient) { }
    
  
    ngOnInit(){}
    RegEx(name:string | null | undefined){
      let n = name;
      n = n?.replaceAll(' ','_');
      n = n?.replaceAll('‌','_');
      n = n?.replaceAll('!','');
      n = n?.replaceAll('!','');
      n = n?.replaceAll('?','');
      n = n?.replaceAll('.','');
      n = n?.replaceAll('؟','');
      n = n?.replaceAll('|','');
      n = n?.replaceAll('<','');
      n = n?.replaceAll('>','');
      n = n?.replaceAll('"','');
      n = n?.replaceAll("'",'');
      n = n?.replaceAll("/",'');
      n = n?.replaceAll("*",'');
      n = n?.replaceAll("&",'');
      n = n?.replaceAll("@",'');
      n = n?.replaceAll("$",'');
      n = n?.replaceAll("%",'');
      n = n?.replaceAll("^",'');
      n = n?.replaceAll("(",'');
      n = n?.replaceAll(")",'');
      n = n?.replaceAll("=",'');
      n = n?.replaceAll("+",'');
      n = n?.replaceAll("[",'');
      n = n?.replaceAll("]",'');
      n = n?.replaceAll(";",'');
      n = n?.replaceAll(":",'');
      n = n?.replaceAll("~",'');
      n = n?.replaceAll("،",'');
      return n
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2.5 * 1000})
    }
    CopyPostShowDetailLink(
      magUser:string | null | undefined ,
      postSlug:string | null | undefined ,
      postTitle: null | undefined | string){
      return `${this.basePath}/katibe/${magUser}/negare/${postSlug}/${this.RegEx(postTitle)}` 
    }
    CopyMagezine(
      magUser:string | null | undefined){
      return `${this.basePath}/katibe/${magUser}` 
    }
    CopyProfile(
      nameUser:string | null | undefined){
      return `${this.basePath}/profile/${nameUser}` 
    }
    GetReportPost(postID:string,href:string){
      let dialogRef = this.Dialog.open(ReportDialogComponent)
      //dialogRef.afterClosed().subscribe(result => console.log(result))
      this.postID.next(postID);
      this.href.next(href);
    }
    SendReportPostMassage(report:ReportInterface){
      let hrefApi;
      this.subscription.push(this.href.subscribe((href => hrefApi = href)))
      this.http.post(`${hrefApi}report/`,report)
    }
    ContactUs(data:ContactInterface){
      this.http.post<ContactInterface>(`${this.basePath}contact/`,data)
    }
    share(url:string){
      if (navigator.share) {
        navigator.share({
                title: 'اشتراک گذاشتن',
                url: `${url}`
            })
            .catch(console.error)
      }
    }
    ngOnDestroy(){
      this.subscription.forEach(sub => sub.unsubscribe())
    }
}

