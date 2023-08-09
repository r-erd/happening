import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { article } from '../article/article.component';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '../articles.service';
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ParameterService } from '../parameter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Output() backEventEmitter = new EventEmitter();
  @Output() creatorEventEmitter = new EventEmitter();
  @Output() confirmEventEmitter = new EventEmitter();
  @Output() deleteEventEmitter = new EventEmitter();
  @Output() successEmitter = new EventEmitter();
  @Input() inAdminView: boolean;
  @Input() selectedArticle: article;


  public inputConsequence: FormControl;
  public inputCause: FormControl;
  public inputTag: FormControl;
  public loc: Location;
  public addedTag: string;
  public addedConsequence: string;
  public addedCause: string;
  public modArt: article;
  public modifiedFlag: boolean;
  public tmp: any;
  public toUpdate: article;
  public var: string[];
  public concernedID: any;
  public reffedArt: article;
  public loading : boolean;


  constructor(public http: HttpClient, public backend : ArticlesService,private actRoute: ActivatedRoute, private router: Router, public para : ParameterService) {
    this.inputCause = new FormControl();
    this.inputConsequence = new FormControl();
    this.inputTag = new FormControl();
    this.addedTag = "";
    this.modArt = new article();
    this.reffedArt = new article();

  }

  //make deletion and change of headline suggestions possible -> how? 
  //make tags clickable and link to filtered-search
  //make conseq and causes clickable (convert array, ngfor with <a>)

  isLower(input: number) {
    if (input <= 33) return true
  }

  isMiddle(input: number) {
    if (input > 33 && input < 66) return true
  }

  isHigh(input: number) {
    if (input >= 66) return true
  }

  ngOnInit(): void {

        //get article id from route 
        this.actRoute.params.subscribe(event => {
          let artID = event.id;
    
    
          this.loading = true;
          this.backend.getUnreviewedArticleById(artID).subscribe(
            response => {
                this.selectedArticle = <article>response;
                console.log("getArticleByID:");
                console.log(response);
                this.modArt = this.selectedArticle;
                this.loading = false;
          });
         
        })

    this.var = (this.modArt.proof).split(" : ")
    this.concernedID = this.var[4];
    this.backend.getArticleById(this.concernedID).subscribe(
      response => {
        this.reffedArt = <article>response;
        console.log("getArticleByID:");
        console.log(response);
      });

  }


  // add logic to convert selectedArticle.causes to list of headlines with links (array of obj with headline and objID -> onlick = display(get.(obj.id)))

    //for "added" : add this as consequence to everything listed as cause (only for the added stuff)
    //for "added" : add this as cause to everything listed as consequence (only for the added stuff?)
    //for "created" : for every consequence / cause

  confirmEvent() {
    this.var = (this.selectedArticle.proof).split(" : ")
    console.log(this.reffedArt);
    switch (this.var[1]) {

      case "tag":
        console.log("case tag");
        this.reffedArt.tags.concat(" ",this.var[2]);
        this.backend.updateArticle(this.reffedArt, this.concernedID); //error putting 500
        this.backend.deleteFromUnreviewedById(this.selectedArticle._id);
        break;

      case "consequence":
        console.log("case consequence");
        this.reffedArt.consequences.push(this.var[2]);
        this.backend.updateArticle(this.reffedArt, this.concernedID); //error putting 500
        this.backend.deleteFromUnreviewedById(this.selectedArticle._id);
        break;

      case "cause":
        console.log("case cause");
        this.reffedArt.causes.push(this.var[2]);
        this.backend.updateArticle(this.reffedArt, this.concernedID); //error putting 500
        this.backend.deleteFromUnreviewedById(this.selectedArticle._id);
        break;

      case "article":
        console.log("case article");
        console.log("article to be published:");
        console.log(this.selectedArticle);
        this.backend.pushToArticleIndex(this.selectedArticle); //error posting 500

      default:
        console.log("Error confirming event!")
        console.log(this.var[1])
        break;
    }
    this.router.navigateByUrl("v");
    //display successMessage on vote ticker (with a service)

  }


  deleteEvent() {
    this.backend.deleteFromUnreviewedById(this.selectedArticle._id);
    this.router.navigateByUrl("/v");
    //display successmessage (with service)
    this.successEmitter.emit("Successfully deleted the article! Moved to garbage database.");
  }

  removeTag(val: string) {
    this.tmp = this.modArt.tags.indexOf(val);
    console.log("index is : " + this.tmp)
    if (this.tmp > -1) {
      this.modArt.tags.replace(val,"");
      console.log("removed tag!")
    }
  }

  removeCause(val: string) {
    this.tmp = this.modArt.causes.indexOf(val);
    console.log("index is : " + this.tmp)
    if (this.tmp > -1) {
      this.modArt.causes.splice(this.tmp, 1);
      console.log("removed cause!")
    }
  }

  removeConsequence(val: string) {
    this.tmp = this.modArt.consequences.indexOf(val);
    console.log("index is : " + this.tmp)
    if (this.tmp > -1) {
      this.modArt.consequences.splice(this.tmp, 1);
      console.log("removed consequence!")
    }
  }
}
