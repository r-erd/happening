import { Injectable, Output, EventEmitter } from '@angular/core';
import { article } from './article/article.component';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiURL } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  selectedArticle : article;
  selected : article;
  created : article;
  toReturn : article;
  temp : article;
  id : string;
  objID : string;
  list : Observable<article[]>;


  constructor(private http: HttpClient) { 
    this.list = this.http.get<Array<article>>(apiURL  +"/api/article_index/published");
    console.log("constructed artService");
  }


  getAllLatestPublished(){
     return this.http.get<Array<article>>(apiURL  + "/api/article_index/published");
  }

  getArticleById(id : string){
    let geturl = apiURL  +"/api/article_index/id/" +id;
    return this.http.get<article>(geturl)
}

/* .subscribe(
  response => {
      this.temp = <article>response;
      console.log("getArticleByID:");
      console.log(response);
}); */

  getUnreviewed(){
    return this.http.get<Array<article>>("https://localhost:8070/api/unreviewed/all");
 }

 getUnreviewedArticleById(id : string){
  let geturl = "https://localhost:8070" +"/api/unreviewed/id/" +id;
  return this.http.get<article>(geturl)
}

  postUnconfirmedArticle( val : article){
    this.http.post("https://localhost:8070/api/unreviewed/", val
    ).subscribe(
    data => {
      console.log("posted created article successfully to unreviewed!");
    },
    error => {
      console.log(JSON.stringify(error.json()));
    });
  }


  //doesnt work ? I dont know
  updateArticle(art : article, id : string){
    this.http.put(apiURL  + "/api/article_index/" + id, art).subscribe(
      data => {
        console.log("successfully updated article!");
      },
      error => {
        console.log("Error updating article!");
      });
  }



  setSelected(art : article){
    this.selected = art;
/*     art.tags = art.tags[0].split(",");
    art.consequences = art.consequences[0].split(",");
    art.causes = art.causes[0].split(","); */
    console.log("set Selected");
    console.log(art);
  }

  deleteFromUnreviewedById(val : string){
    this.http.delete("https://localhost:8070/api/unreviewed/" + val
    ).subscribe(
    data => {
      console.log("Article was removed from Unreviewed!");
    },
    error => {
      console.log("something went wrong deleting article");
    });
  }

  pushToArticleIndex(val : article){
    val.published = true;
    this.http.post(apiURL  + "/api/article_index/", val
    ).subscribe(
    data => {
      console.log("Article is now public!");
    },
    error => {
      console.log("error posting to article_index");
    });

    this.objID = val._id;
    this.http.delete("https://localhost:8070/api/unreviewed/" + this.objID
    ).subscribe(
    data => {
      console.log("Article was removed from Unreviewed!");
    },
    error => {
      console.log("something went wrong deleting confirmed article");
    });
  }

  getSelected(){
    //gets called to frequently!
    console.log("retrieved Selected");
    console.log(this.selected)
    return this.selected;
  }

  setCreated(art : article){
    this.created = art;
    console.log("set Created");
  }

  getCreated(){
    //gets called to frequently!
    console.log("retrieved Created");
    console.log(this.created)
    return this.created;
  }

  setList(art : Observable<article[]>){
    this.list = art;
    console.log("set List");
  }

  getList(){
    console.log("retrieved List");
    return this.list;
  }


}
