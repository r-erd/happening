import { Component, OnInit, Output, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { EventEmitter } from '@angular/core';
import { of, interval, Subject, Observable, Subscription } from 'rxjs';
import { isEmpty, startWith, mapTo, defaultIfEmpty, count, toArray, switchMap } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { ParameterService, setting } from '../parameter.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { article } from '../article/article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-votingticker',
  templateUrl: './votingticker.component.html',
  styleUrls: ['./votingticker.component.css'],
  providers: [SearchService, ArticlesService]
})
export class VotingtickerComponent implements OnInit {

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

  ngOnInit(): void {
    this.loading = true;
     this.backend.getUnreviewed().subscribe( (res) => { 
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


  resetFilterEvent() {
    this.resetFilterEmitter.emit("reset");
  }


  selectedArticle(art: article) {
    this.backend.setSelected(art);
  }


 


}




