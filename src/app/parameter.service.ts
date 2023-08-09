import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ParameterService {
  term : String;
  tags : String[];
  region : String;
  auth : number;
  imp : number;
  sign : number;
  dateEnd : Date;
  dateStart : Date;
  cSetting : setting;
  @Output() ParaEventEmitter = new EventEmitter()

  constructor() {
    this.auth = 0;
    this.sign = 0;
    this.imp = 0;
    this.region = "";
    this.cSetting = new setting(0,"",0,0,0,[],"");
   }


  setStart(value : Date){
    this.dateStart = value
    this.cSetting.dateStart = value;
    this.ParaEventEmitter.emit(this.cSetting);
  } 

  setEnd(value : Date){
    this.dateEnd = value;
    this.cSetting.dateEnd = value;    
    this.ParaEventEmitter.emit(this.cSetting);

  }



  setTerm(st : String){
    this.term = st;
    this.cSetting.term = st;
    this.ParaEventEmitter.emit(this.cSetting);
  }

  setAuth(value : number){
    this.cSetting.auth = value;
    this.ParaEventEmitter.emit(this.cSetting)
  }

  keepLive(){
    this.cSetting.refresher = this.cSetting.refresher +1;
    this.ParaEventEmitter.emit(this.cSetting);
  }

  setImp(value : number){
    this.cSetting.imp = value;
    this.ParaEventEmitter.emit(this.cSetting)
  }

  setSign(value : number){
    this.cSetting.sign = value;
    this.ParaEventEmitter.emit(this.cSetting)
  }

  //doesnt work
  addTag(st : String){
    console.log("called addTag");
    console.log(this.cSetting.tags);
    this.cSetting.tags.push(st);
    this.ParaEventEmitter.emit(this.cSetting)
  }

  resetTags(){
    this.tags = [];
    this.cSetting.tags = [];
  }

  removeTag(str : String){
    this.cSetting.tags.splice(this.cSetting.tags.indexOf(str),1);
    this.ParaEventEmitter.emit(this.cSetting);
  }

  setRegion(st : String){
    this.cSetting.region = st;
    this.ParaEventEmitter.emit(this.cSetting)
  }

  resetRegion(){
    this.cSetting.region = "";
    this.ParaEventEmitter.emit(this.cSetting)
  }
}


export class setting{
  constructor(
    public refresher : number,
    public term : String,
    public auth : number,
    public sign : number,
    public imp : number,
    public tags : String[],
    public region? : String,
    public dateStart : Date = new Date("1970-01-01"),
    public dateEnd : Date = new Date(),


  ){
    
  }

}