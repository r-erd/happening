import { Component, OnInit, Input, Output, SimpleChange} from '@angular/core';
import { article } from '../article/article.component';
import { EventEmitter } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '../articles.service';
import {FormControl } from "@angular/forms";
import { Location } from '@angular/common';
import { SearchService } from '../search.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ParameterService, setting } from '../parameter.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers : [ArticlesService,SearchService]
})
export class DetailsComponent implements OnInit {


  @Output() backEventEmitter = new EventEmitter();
  @Output() creatorEventEmitter = new EventEmitter();
  @Output() confirmEventEmitter = new EventEmitter();
  @Output() deleteEventEmitter = new EventEmitter();
  @Output() successEmitter = new EventEmitter();
  @Input() inAdminView;
  public inputConsequence : FormControl;
  public inputCause : FormControl;
  public inputTag : FormControl;
  public loc : Location;
  public addedTag : string;
  public addedConsequence : string;
  public addedCause : string;
  public modArt : article;
  public successMessage : boolean;
  public errorMessage : boolean;
  public selectedArticle : article = new article("error loading article details");
  public artID : string;
  public loading : boolean;
  
  constructor( public http: HttpClient, public backend : ArticlesService,private actRoute: ActivatedRoute, private router: Router, public para : ParameterService){ 
   
    console.log(this.artID)
    this.inputCause = new FormControl();
    this.inputConsequence = new FormControl();
    this.inputTag = new FormControl();
    this.addedTag = "";
    this.modArt = new article();
  }

  //make deletion and change of headline suggestions possible -> how? 
  //make tags clickable and link to filtered-search
  //make conseq and causes clickable (convert array, ngfor with <a>)


  toggleAddTagField(){
    this.fields.tag = !this.fields.tag;
  }

  toggleAddSourceField(){
    this.fields.source = !this.fields.source;
  }

  isLower(input : number){
    if (input <= 33) return true
  }

  isMiddle(input : number){
    if (input > 33 && input < 66) return true
  }

  isHigh(input : number){
    if (input >= 66) return true
  }

  hasWhiteSpace(s :string) {
    return s.indexOf(' ') >= 0;
  }

  routeTo(tag : String){
    this.router.navigate(['/home'])  ;
    this.para.resetTags();
    this.para.addTag(tag);
  }

  showMessageSuccess(){
    this.successMessage = true;
    var that = this;
  
    setTimeout(function(){
      that.successMessage = false;
    },10000);
  
  }

  showMessageError(){
    //this.errorMessage = str;
    var that = this;
    this.errorMessage = true;

    setTimeout(function () {
      that.errorMessage = false;
    }, 10000);
  
  }

  refresh(){
    window.location.reload();
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.inputCause = new FormControl();
    this.inputConsequence = new FormControl();
    this.successMessage = false;

    //get article id from route 
    this.actRoute.params.subscribe(event => {
      this.artID = event.id;


      this.loading = true;
      this.backend.getArticleById(this.artID).subscribe(
        response => {
            this.selectedArticle = <article>response;
            console.log("getArticleByID:");
            console.log(response);
            this.modArt = this.selectedArticle;
            this.loading = false;
      });
     
    })

    //get article information from db with id
    //route to 404 page if article id is not valid
    console.log(this.backend.id) 

  }

 

  scrollToTop() {
    window.scrollTo(0,0);
  }


  // add logic to convert selectedArticle.causes to list of headlines with links (array of obj with headline and objID -> onlick = display(get.(obj.id)))

  fields = { tag: false,
    source : false,
   };


   //this shit seems to be working now

   addCause(){
     if (this.inputCause.value.length == 24){
      this.successMessage = true;
      this.modArt.proof = "add : cause : " + this.inputCause.value + " : to : " + this.selectedArticle._id; //safe this in other fields
      this.backend.postUnconfirmedArticle(this.modArt);
      this.modArt.causes.push(this.inputCause.value);
      this.inputCause.reset();
      //this.modArt.tags.pop() //is this neccessary?
      //display success?
      //clear modArt
     }
   }

   addConsequence(){
     if (this.inputConsequence.value.length == 24){
      this.successMessage = true;
     this.modArt.proof = "add : consequence : " + this.inputConsequence.value + " : to : " + this.selectedArticle._id; //safe this in other fields
     this.backend.postUnconfirmedArticle(this.modArt);
     this.modArt.consequences.push(this.inputConsequence.value);
     this.inputConsequence.reset();
     //this.modArt.tags.pop() //is this neccessary?
     //display success?
     //clear modArt
   }
  }
    
   addTag(){
    if(this.hasWhiteSpace(this.inputTag.value)){
      this.showMessageError(); //doesnt disappear somehow
      this.inputTag.reset();
    } else {
    this.modArt.proof = "add : tag : " + this.inputTag.value.toLowerCase() +  " : to : " + this.selectedArticle._id; //create "other" field in article for this information
    this.showMessageSuccess(); //doesnt disappear somehow
    this.backend.postUnconfirmedArticle(this.modArt);
    //save author of change somewhere (& ip? ) -> log on server
    //make details view be different if importance == 0 ( read as boolean? with ngIf)
    this.modArt.tags.concat(" ",(this.inputTag.value).toLowerCase()); //add req: no spaces  
    this.inputTag.reset();
    //this.modArt.tags.pop() //is this neccessary?

    //somehow retrieveSelected delivers modArt? -> displays wrong article
    //clear modArt
  }
}

  /*
  addMedia(concernedObjectId,mediaToAdd){
    this.http.post(apiURL  + "/api/article_index/", JSON.stringify({
      concernedObjectId: concernedObjectId,
      media: mediaToAdd,
    })).subscribe(
    data => {
      alert('ok');
    },
    error => {
      console.log(JSON.stringify(error.json()));
    });

  }

  addSource(concernedObjectId,sourceToAdd){
    this.http.post(apiURL  + "/api/article_index/", JSON.stringify({
      concernedObjectId: concernedObjectId,
      source: sourceToAdd,
    })).subscribe(
    data => {
      alert('ok');
    },
    error => {
      console.log(JSON.stringify(error.json()));
    });

  }
 */



}
