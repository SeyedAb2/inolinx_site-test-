import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticlePost } from '../shared/interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit {
  readonly baseUrl = environment.BaseApiUrl;
  constructor(private http:HttpClient) {  }
  getAllMagezinePost(){
    return this.http.get<ArticlePost>(this.baseUrl+'katibe/negare/all/')
    // return this.http.get<ArticlePost>('../../assets/mock/homePost.json')
  }
  ngOnInit() {
      
  }
}

