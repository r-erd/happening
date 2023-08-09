import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideInAnimation,
    trigger("test", [
    state('one', style({
    opacity: 1,
  })),
  state('two', style({
    opacity: 0,
  })),
  transition('one <=> two', [
    animate('0.5s 0.5s ease-in-out')
  ])
]),  
  ]
})
export class AboutComponent implements OnInit {

  public test : boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
