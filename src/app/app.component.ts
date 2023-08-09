import { Component} from '@angular/core';
import { article } from './article/article.component';
import { SearchService } from './search.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from "@angular/forms";
import { ArticlesService } from './articles.service';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ParameterService } from './parameter.service';
import { AuthService } from '@auth0/auth0-angular';
import { apiURL } from 'src/environments/environment';
import {NgcCookieConsentModule, NgcCookieConsentConfig, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent} from 'ngx-cookieconsent';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { slideInAnimation } from './animations';
import axios from "axios";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService, ParameterService, ArticlesService, DetailsComponent, AuthService],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})




export class AppComponent {
  private cookieValue : string;
  title = 'angular-app-tester';
  voteView = false;
  searchText = "Search by id or keyword...";
  createView = false;
  inAdminView = false;
  articleAdminView = false;
  messageSuccess = false;
  infoMessage = true;
  LoginLogoutButton = "be you";
  successMessage = "undefined";
  public currArticle: article;
  public cookiesAccepted = false;
  temp: article;
  private loading: boolean = false;
  public resultsApp: Observable<article[]>;
  public searchField: FormControl;
  public rootUrl = "https://" + apiURL;







  ngOnInit() {
    this.searchField = new FormControl();
    this.cookieValue = this.cookieService.get("cookiePolicy");
    if (this.cookieValue){
      this.cookiesAccepted = true;
    }

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }



  constructor(public cookieService:CookieService, public auths : AuthService, private actRoute: ActivatedRoute, private router: Router, public searchS: SearchService, public backend: ArticlesService, public filter: ParameterService) {
  }



  showMessageSuccess(str: string) {
    this.successMessage = str;
    var that = this;
    this.messageSuccess = true;

    setTimeout(function () {
      that.messageSuccess = false;
    }, 10000);

  }
  
  acceptCookies(){
    this.cookiesAccepted = true;
    this.cookieService.set("cookiePolicy","accepted", 2);
  }

  isAuthenticated(){

    if (localStorage.getItem("token") != null) return true;

/*     axios.get("http://localhost:5000/auth", { headers: { token: localStorage.getItem("token")}})
    .then (res => {
        return <boolean> res.data.valid
    }) */
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }




  doSearch(term: string) {
    //somehow display what the results are displayed for (as placeholder? as with region??)
    //is id:
    if (term == null)  {
    this.filter.setTerm("");
    }

    //is search term:

    else if (term.length == 24) {
      this.searchS.get(term).subscribe(res => this.temp = res);
      if (true) { //there was a result; else : no result page
        this.backend.setSelected(this.temp);
        this.router.navigate(["art/" + term]);
      }
    }
    else {
      this.filter.setTerm(term);
      //this.backend.setList(this.searchS.search(term));
      //there was a result; else : no result page
      //refresh view
    }
  }





}
