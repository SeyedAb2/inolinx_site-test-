import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MagezineDetail } from '../shared/interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class MagezineService implements OnInit{
  readonly baseUrl = environment.BaseApiUrl;
  constructor(private http:HttpClient) {}
  ngOnInit() {}
  getAllMagezine(){
    return this.http.get<MagezineDetail>(this.baseUrl+'katibe/')
    //return this.http.get<MagezineDetail>('../../assets/mock/singleMagezine.json')
  }

}
