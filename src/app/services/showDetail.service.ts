import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MagezineDetail, Profile, ShowDetail } from '../shared/interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailService implements OnInit{
  readonly baseUrl = environment.BaseApiUrl;
  constructor(private http:HttpClient) { }
  ngOnInit(){ }
  getAuthor(name:string){
    return this.http.get<Profile>(`${this.baseUrl}hamafarin/${name}/`);
    //return this.http.get<Profile>('../../assets/mock/profile.json');
  }
  getMagezine(name:string | undefined){
    return this.http.get<MagezineDetail>(`${this.baseUrl}katibe/${name}/`);
    //return this.http.get<MagezineDetail>('../../assets/mock/singleMagezine.json');
  }
  getDetail(mag:string | undefined,postId:string | undefined){
    return this.http.get<ShowDetail>(`${this.baseUrl}katibe/${mag}/negare/${postId}/`);
    //return this.http.get<ShowDetail>('../../assets/mock/showDetail.json');
  }
}

