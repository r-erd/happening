import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { WikiComponent } from './wiki/wiki.component';
import { VoteComponent } from './vote/vote.component';
import { CreatorComponent } from './creator/creator.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { VotingtickerComponent } from './votingticker/votingticker.component';
import { TermsComponent } from './terms/terms.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {animation: 'HomePage'}
  },
  {
    path: '',   redirectTo: '/home', pathMatch: 'full',
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'art/:id',
    component: DetailsComponent,
    data: {animation: 'ArticlePage'}
  },
  {
    path: 'vote/:id',
    component: VoteComponent,
    data: {animation: 'ArticlePage'},
  },
  {
    path: 'wiki',
    component: WikiComponent,
    data: {animation: 'WikiPage'}
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {animation: 'AboutPage'}
  },
  {
    path: 'create',
    component: CreatorComponent,
    data: {animation: 'CreatePage'},
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {animation: 'LoginPage'}
  },
  {
    path: 'v',
    component: VotingtickerComponent,
    data: {animation: 'VotingPage'}
  },
  {
    path: 'tos',
    component: TermsComponent,
    data: {animation: 'TermsPage'}
  },
  {
     path: '**', 
     component: PageNotFoundComponent },
             // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
