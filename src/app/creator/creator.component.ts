import { Component, OnInit, Input, Output } from '@angular/core';
import { article } from '../article/article.component';
import { FormControl, Form } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  @Output() sendAndBackEventEmitter : EventEmitter<string>;
  @Output() successEmitter : EventEmitter<string>;
  @Output() errorEmitter : EventEmitter<string>;

  public inputConsequence : FormControl;
  public inputCause : FormControl;
  public inputHeadline : FormControl;
  public inputTag : FormControl;
  public inputSource : FormControl;
  public createdArticle : article;
  public tmp : number;
  public successMessage : boolean;
  public errorMessage : boolean;
  public message : string;
  public regexpLink : RegExp;
  public tagsArray : String[];

  constructor(public backend : ArticlesService, private router : Router) {
   this.sendAndBackEventEmitter = new EventEmitter();
   this.successEmitter = new EventEmitter();
   this.errorEmitter = new EventEmitter();
   this.inputConsequence = new FormControl();
   this.inputCause = new FormControl();
   this.inputHeadline = new FormControl();
   this.inputTag = new FormControl();
   this.inputSource = new FormControl();
   this.createdArticle = new article();
   this.createdArticle.causes = [];
   this.createdArticle.consequences = [];
   this.createdArticle.tags = "";
   this.tagsArray = [];
   this.createdArticle.sources = [];
   this.regexpLink = new RegExp('^(https?:\\/\\/)?'+ // protocol
   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
   '(\\#[-a-z\\d_]*)?$','i')
   

   }
  //make creatorView easily distinguishable from articleView (colored backgorund?)
   //make adding region and media possible
   //check inputs for validity

  
  ngOnInit(): void {
    this.createdArticle.importance = 1;
    this.createdArticle.authenticity = 1;
    this.createdArticle.impact = 50;
  }


  hasColon(s :string) {
    return s.indexOf(':') >= 0;
  }

  hasWhiteSpace(s :string) {
    return s.indexOf(' ') >= 0;
  }

  showMessageSuccess(str : string){
    this.successMessage = true;
  
    setTimeout(function(){
      this.successMessage = false;
    },10000);
  
  }

  showMessageError(str : string){
    this.message = str;
    this.errorMessage = true;

    setTimeout(function(){
      this.errorMessage = false;
    },10000);

  }

  sendAndBackEvent(){

    this.submitArticle();

  }

  addCause(val : string){
        //check whether its a vaild objid(with function (add to if))
    if(this.inputCause.value.length != 24){ 
      this.showMessageError("No vaild ObjID!");
      return;
    }
    this.createdArticle.causes.push(val);
    this.inputCause.reset();
    this.showMessageSuccess("Successfully added <cause.headline> as cause! ")
  }

  addConsequence(val : string){
        //check whether its a vaild objid with function (add to if)
    if(this.inputConsequence.value.length != 24){ 
      this.showMessageError("No vaild ObjID!");
      return;
    }
    this.createdArticle.consequences.push(val);
    this.inputConsequence.reset();
    this.showMessageSuccess("Successfully added <consequence.headline> as consequence!")
  }

  addTag(val : string){
    if (this.hasWhiteSpace(this.inputTag.value)) { //check for other bad characters,allow only a to z
      this.showMessageError("Error! You used not-allowed characters or spacing!")
      this.inputTag.reset();
    } else {
    val = val.toLowerCase();
    this.createdArticle.tags = this.createdArticle.tags + " " + val;
    console.log(this.createdArticle.tags);
    this.inputTag.reset();
    this.tagsArray.push(val);
  }
}

  addHeadline(){
    if(this.hasColon(this.inputHeadline.value)){
      //display error message -> hint what was wrong
      this.inputHeadline.reset()
      this.showMessageError("Error! You used not-allowed characters or spacing!");
    } else {

    this.createdArticle.headline = this.inputHeadline.value;
    }
  }


  addSource(val : string){ ///check for valid link with regex
    if(this.regexpLink.test(val)){
      this.createdArticle.sources.push(val);
      this.inputSource.reset();
    } else {
    this.showMessageError("Error! The entered source is not a valid url!");
  }
}

  //input region?
  //interactive map vs input country / region as text or G+ Code or e.g. DE - EU - USA - FR abbrev.


  removeTag(val : string){
    this.tmp = this.createdArticle.tags.indexOf(val);
    if (this.tmp > -1){
      this.createdArticle.tags.replace(val,"");
    }
  }

  removeCause(val : string){
   this.tmp = this.createdArticle.causes.indexOf(val);
   if (this.tmp > -1){
     this.createdArticle.causes.splice(this.tmp,1);
   }
 }

 removeConsequence(val : string){
   this.tmp = this.createdArticle.consequences.indexOf(val);
   if (this.tmp > -1){
     this.createdArticle.consequences.splice(this.tmp,1);
   }
 }

 removeSource(val : string){
  this.tmp = this.createdArticle.sources.indexOf(val);
  if (this.tmp > -1){
    this.createdArticle.sources.splice(this.tmp,1);
  }
}


  submitArticle(){
    if(this.createdArticle.headline == "" || this.createdArticle.tags.length == 0 || this.createdArticle.sources.length == 0){ 
      this.showMessageError("Error! One or more required fields (headline, tags, source) is empty!");
      console.log("error -  fields empty");
      console.log(this.createdArticle)
      return;
    }
    this.createdArticle.proof = "add : article : "+  this.createdArticle.headline + " : to : " + this.createdArticle._id;
    this.createdArticle.setToCurrDate(); //doesnt work properly - is included in the DB entry - keep this?
    this.createdArticle.published = false;
    this.backend.postUnconfirmedArticle(this.createdArticle);
    this.router.navigateByUrl("/home");

    //display success / error message on home (via Service) 
    //check input before enabling button to submit? - curse words, prevent suggesting stuff already there, spelling, must-have fields?

    //add this as consequence to everything listed as cause
    //add this as cause to everything listed as consequence

  }
}
