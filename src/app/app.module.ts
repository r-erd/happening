import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxLoadingModule } from 'ngx-loading'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArticlesService } from './articles.service';
import { SummaryPipe } from './summary.pipe';
import { PanelComponent } from './panel/panel.component';
import { ArticleComponent } from './article/article.component';
import { FilterComponent } from './filter/filter.component';
import { DetailsComponent } from './details/details.component';
import { VoteComponent } from './vote/vote.component';
import { SubmissionComponent } from './submission/submission.component';
import { ShortinputComponent } from './shortinput/shortinput.component';
import { SearchService } from './search.service';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CreatorComponent } from './creator/creator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { WikiComponent } from './wiki/wiki.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ParameterService } from './parameter.service';
import { AuthModule, AuthService, AuthGuard } from '@auth0/auth0-angular';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { VotingtickerComponent } from './votingticker/votingticker.component';
import { RouterModule } from '@angular/router';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    PanelComponent,
    ArticleComponent,
    FilterComponent,
    DetailsComponent,
    VoteComponent,
    SubmissionComponent,
    ShortinputComponent,
    CreatorComponent,
    AboutComponent,
    WikiComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    VotingtickerComponent,
    TermsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent, data: {animation: 'AboutPage'}  },
      { path: 'wiki', component: WikiComponent, data: {animation: 'WikiPage'}  },
      { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
      { path: 'login', component: HomeComponent, data: {animation: 'LoginPage'} },
    ]),
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      backdropBackgroundColour: 'rgba(255,255,255,1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#000000', 
    }),

    AuthModule.forRoot({
      domain: 'happening.eu.auth0.com',
      clientId: '12345uDtwDw9URPuNuAFYYFMyN84Exz7'
    })


  ],
  providers: [
    ArticlesService,
    SearchService,
    ParameterService,
    AuthService,
    AuthGuard,
    HttpClient]
    ,
  bootstrap: [AppComponent]
})


export class AppModule { }
