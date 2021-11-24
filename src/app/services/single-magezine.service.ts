import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment'
import { ArticlePostSingleMagezine, InfoMagazine, MagezineDetail } from '../shared/interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class SingleMagezineService implements OnInit {
  readonly baseUrl = environment.BaseApiUrl;
  singleMagezineName = new BehaviorSubject<string>('');
  singleMagezineData = new BehaviorSubject(<any>{});
  categoryName = new BehaviorSubject<number>(1);
  categoryData = new BehaviorSubject<any>({});
  constructor(private http:HttpClient){}
  ngOnInit() {
    
  }
  getSingleMagezine(name:string){
    return this.http.get<MagezineDetail>(`${this.baseUrl}katibe/${name}/`)
   // return this.http.get<MagezineDetail>('../../assets/mock/singleMagezine.json')
  }
  getSingleMagezineInfo(name:string){
    return this.http.get<InfoMagazine>(`${this.baseUrl}katibe/${name}/detail/`)
   // return this.http.get<MagezineDetail>('../../assets/mock/singleMagezine.json')
  }
  getSingleMagezinePost(name:string){
    return this.http.get<ArticlePostSingleMagezine>(`${this.baseUrl}katibe/${name}/negare/`)
    // return this.http.get<ArticlePostSingleMagezine>('../../assets/mock/articlePost.json')
  }
  getCategory(name:string | undefined){
    return this.http.get<any>(`${this.baseUrl}katibe/${name}/category/`)
  }
  getCategorizedPost(magName:string,catID:number){
    return this.http.get<ArticlePostSingleMagezine>(`${this.baseUrl}katibe/${magName}/negare/category/${catID}/`);
  }
}

