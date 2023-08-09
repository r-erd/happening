import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class WikiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
