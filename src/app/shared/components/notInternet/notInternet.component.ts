import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notInternet',
  templateUrl: './notInternet.component.html',
  styleUrls: ['./notInternet.component.scss']
})
export class NotInternetComponent implements OnInit {

  constructor(private Title:Title) { }

  ngOnInit() {
    this.Title.setTitle("اینولینکس | No Internet")
  }

}
