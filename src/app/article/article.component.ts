import { Component, OnInit, Output, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { EventEmitter } from '@angular/core';
import { of, interval, Subject, Observable, Subscription } from 'rxjs';
import { isEmpty, startWith, mapTo, defaultIfEmpty, count, toArray, switchMap } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { ParameterService, setting } from '../parameter.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [SearchService, ArticlesService]
})
export class ArticleComponent implements OnInit {

  @Output() clickedArticle = new EventEmitter();
  //@Input() articles: Observable<article[]>
  @Input() articles : article[];
  @Output() resetFilterEmitter = new EventEmitter();
  @Output() addArticleEmitter = new EventEmitter();

  constructor(public backend: ArticlesService, public filter: ParameterService, public searchS: SearchService) {
  }

  public noResult: Boolean;
  public loading = false;
  public obs : Observable<any>;

  isZero(input: number) {
    if (input == 0) return true;
  }

  isLower(input: number) {
    if (input <= 33 && input > 0) return true
  }

  isMiddle(input: number) {
    if (input > 33 && input < 66) return true
  }

  isHigh(input: number) {
    if (input >= 66) return true
  }

  resetFilterEvent() {
    this.resetFilterEmitter.emit("reset");
  }


  selectedArticle(art: article) {
    this.backend.setSelected(art);
  }


  ngOnInit(): void {

    //no loading animation for this one :()
    this.loading = true;
    this.searchS.search(this.filter.cSetting).subscribe( (res) => { 
      this.articles = res; 
      this.loading = false;
    });



    this.filter.ParaEventEmitter.subscribe(
      (st) => {
        this.loading = true;
        this.searchS.search(st).subscribe(
          (res) => {
            this.loading = false;
            this.articles = res;
            if (this.articles.length == 0){
              this.noResult = true;
              console.log(this.articles)
            } else {
              this.noResult = false;
              console.log(this.articles)
            }
          }, err => {
            //...
        });
          
      } , err => {
        //...
    });
    
  }
}


export class article {
  constructor(
    public headline?: string,
    public causes?: Array<string>,
    public consequences?: Array<string>,
    public _id?: any,
    public importance?: number,
    public timestamp?: string,
    public tags?: string,
    public region?: string,
    public impact?: number,
    public authenticity?: number,
    public published?: boolean,
    public sources?: Array<string>,
    public proof?: string,
  ) {

  }

  setToCurrDate() {
    this.timestamp = (new Date().getDay().toString() + "." + new Date().getMonth().toString() + "." + new Date().getFullYear().toString()).toString()
  }
}
