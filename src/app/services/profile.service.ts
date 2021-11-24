import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, ProfileAllPost } from '../shared/interfaces/index.interface';
import { SingleMagezineService } from './index.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {
  readonly baseUrl = environment.BaseApiUrl;
  constructor(private http:HttpClient,
              private magService:SingleMagezineService) {}
  ngOnInit(){
    
  }
  getAllProfile(){
    return this.http.get<Profile>(`${this.baseUrl}/hamafarin/all/`)
  }
  getProfile(name:string){
    return this.http.get<Profile>(`${this.baseUrl}hamafarin/${name}/`)
    //return this.http.get<Profile>('../../assets/mock/profile.json')
  }
  getProfileAllPost(name:string){
    return this.http.get<ProfileAllPost>(`${this.baseUrl}katibe/hamafarin/${name}/negare/`);
    //return this.http.get<ProfileAllPost>('../../assets/mock/profileAllPost.json');
  }
}
