import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private Title:Title) { }

  ngOnInit() {
    this.Title.setTitle("اینولینکس | 404")
  }

}
