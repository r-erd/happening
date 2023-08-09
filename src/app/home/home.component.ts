import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { SearchService } from '../search.service';
import { setting } from '../parameter.service';
import { AuthModule, AuthService, AuthGuard } from '@auth0/auth0-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { slideInAnimation } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthService],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class HomeComponent implements OnInit {
  @Input() setting : setting;

  constructor(public searchS: SearchService, public backend: ArticlesService, public auths : AuthService) { }

  ngOnInit(): void {
    this.scrollToTop()
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
