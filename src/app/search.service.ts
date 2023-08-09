import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { article } from './article/article.component';
import { setting } from './parameter.service';
import { apiURL } from 'src/environments/environment';




@Injectable({
  providedIn: 'root',
})
export class SearchService {
  baseUrl: string = apiURL+ "/api/article_index/filter/";
  queryUrl: string = "?search=";


  constructor(private http:HttpClient) { }

  search(para: setting) : Observable<article[]> {


    var dd = String(para.dateStart.getDate()).padStart(2, '0');
    var mm = String(para.dateStart.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = para.dateStart.getFullYear();
    let dateStart = dd + "-" + mm + "-" + yyyy;

    var dd = String(para.dateEnd.getDate()).padStart(2, '0');
    var mm = String(para.dateEnd.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = para.dateEnd.getFullYear();
    let dateEnd = dd + "-" + mm + "-" + yyyy;


    let searchUrl = this.baseUrl +"a" + para.auth + "/s" + para.sign + "/i" +para.imp + "/ds" + dateStart + "/de" + dateEnd + "/k" + para.tags.join("+") + "/t" + para.term + "/r" + para.region;
    console.log(searchUrl);
    return this.http.get<Array<article>>(searchUrl);

  }

  get(id: string){
    let searchUrl = this.baseUrl +"id/" + id;
    console.log("searchService  worked");
    console.log(searchUrl);
    return this.http.get<article>(searchUrl);
  }
  //implement filter as search with combined search results (where they align (schnittmenge - rechenintensiv))
}
