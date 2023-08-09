import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParameterService, setting } from '../parameter.service';
import { AuthModule, AuthService, AuthGuard } from '@auth0/auth0-angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [AuthService]
})

export class FilterComponent implements OnInit {
  public inputTag : FormControl; 
  public inputDateStart : FormControl;
  public inputDateEnd : FormControl;
  public inputMetricAuth : FormControl;
  public inputMetricSign : FormControl;
  public inputMetricImp : FormControl;
  public inputRegion : FormControl;
  public currSett : setting;
  public regionSet : boolean;
  public live : boolean;
  public state : String;
  public regionList : String[];
  public tagList : String[];
  public intervalZ = true;
  public intervalA = false;
  public intervalB = false;
  public intervalC = false;
  public refreshInterval = 10000;

  @Input() tags : String[]

  //https://unstats.un.org/unsd/methodology/m49/
  //BCP 47
  //ISO 3166-1 numeric
  //TODO: Regions via Postal code or something else 
  supranationalRegions = ["World", "Africa", "Americas","Latin America", "Carribean", "Central America", "South America", "North America", "Asia","Central Asia", "Eastern Asia", "South-eastern Asia", "Southern Asia", "Western Asia", "Europe", "Eastern Europe", "Nothern Europe", "Southern Europe", "Western Europe", "Oceania", "Polynesia", "Micronesia", "Melanesia", "Northern Africa", "Sub-Saharan Africa", "Eastern Africa", "Middle Africa", "Souterh Africa", "Western Africa"]
  geopoliticalEntities = [ "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", 
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunel Darussalam", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile","China", "Hong Kong", "Macao", "Christmas Island", "Cocos Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatioa", "Cuba", "Curacao", "Cyprus", "Czechia", "Republic of Korea", "Republic of the Congo", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Terrotories", 
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See", "Honduras", "Hungary", 
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japam", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", 
  "Lao", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", 
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Norht Macedonia", "Nothern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", 
  "Republic of Korea", "Republic of Moldova", "Réunion", "Romania", "Russian Federation", "Rwanda", "Sait Barthélemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Sark", "Saudi Arabia", "Senegal", 
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "State of Palestine", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Sweden", "Switzerland", "Syrian Arab Republic", 
  "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda","Ukraine", "United Arab Emirates", 
  "United Kingdom of Great Britain and Northern Ireland", "United Republic of Tanzania", "United States Minor Outlying Islands", "United States of America", "United States Virgin Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
  tagData = ["crime", "politics", "international", "blm", "shooting", "murder"];
  regionData = this.supranationalRegions.concat(this.geopoliticalEntities);
  lastkeydown : number = 0;

  

  constructor(public paraService : ParameterService, public auths : AuthService) { 
    this.inputTag = new FormControl();
    this.inputDateStart = new FormControl();
    this.inputDateEnd = new FormControl();
    this.inputMetricAuth = new FormControl();
    this.inputMetricImp = new FormControl();
    this.inputMetricSign = new FormControl();
    this.inputRegion = new FormControl();
    this.tags = [];
    this.currSett = new setting(0,"",0,0 ,0,[])
    this.regionSet = false;
    this.currSett.region = ""
    this.live = false;
    this.inputMetricAuth.setValue(1);
    this.inputMetricImp.setValue(1);
    this.inputMetricSign.setValue(1);
    this.state = "off";
    }

  ngOnInit(): void {
    //(change) bei jedem input -> aufruf funktion zur Datenbankabfrage mit entsprechendem Filter (EVENT)
    this.paraService.setRegion("");
    this.paraService.setTerm("");
    this.tags = this.paraService.cSetting.tags;
    setInterval( ()=> this.refreshResults(), this.refreshInterval)
  }

  refreshResults(){
    if (this.live){
      this.paraService.keepLive();
    }

  }

  addStart(){
    this.paraService.setStart(new Date(this.inputDateStart.value));
  }

  addEnd(){
    this.paraService.setEnd(new Date(this.inputDateEnd.value));
  }

  addTag(){
    let input = this.inputTag.value.toLowerCase();
    if (this.tags.indexOf(input) == -1){
    //check for whitespace!
    this.paraService.addTag(input);
    this.inputTag.reset()
    }
  }

  setTagSuggestions($event){
    this.tagList = [];

    if (this.inputTag.valueChanges){
      this.tagList = this.searchFromArray(this.tagData, this.inputTag.value);
    }
  }

  removeTag(str : string){
    this.paraService.removeTag(str);
  }

  setAuth(){
    this.paraService.setAuth(this.inputMetricAuth.value);
  }

  setImp(){
    this.paraService.setImp(this.inputMetricImp.value);
  }

  setSign(){
    this.paraService.setSign(this.inputMetricSign.value);
  }

  setRegion(){
    //validate input - must be in regionData Array!! -> Error Message please choose from suggestions
    this.paraService.setRegion(this.inputRegion.value);
  }

  resetRegion(){
    this.inputRegion.reset();
    this.inputRegion.enable();
    this.regionSet = !this.regionSet;
    this.paraService.resetRegion();
  }

  toggleLive(interval){
    this.live = !this.live;
    this.state = this.live ? "on" : "off";
    switch (interval){
      case 0:
        this.intervalZ = true;
        this.intervalA = false;
        this.intervalB = false;
        this.intervalC = false;
        break;
      case 1: 
      this.intervalZ = false;
      this.intervalA = true;
      this.intervalB = false;
      this.intervalC = false;
      this.refreshInterval = 1000;
        break;
      
      case 2: 
      this.intervalZ = false;
      this.intervalA = false;
      this.intervalB = true;
      this.intervalC = false;
      this.refreshInterval = 60000;
        break;
      case 3: 
      this.intervalZ = false;
      this.intervalA = false;
      this.intervalB = false;
      this.intervalC = true;
      this.refreshInterval = 6000;
        break;
    }
  }


  getRegions($event){
    this.regionList = [];

    if (this.inputRegion.valueChanges) {
      if(true){
        this.regionList = this.searchFromArray(this.regionData, this.inputRegion.value)
      }
    }
  }

  searchFromArray(arr, regex){
    let matches = [], i;
    for (i= 0;i<arr.length; i++){
      if (arr[i].match(regex) && (arr[i]) != regex) {
        matches.push(arr[i]);
      }
    }
    return matches;
  }





  
}


