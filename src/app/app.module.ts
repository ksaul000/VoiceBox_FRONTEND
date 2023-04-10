import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedComponent } from './feed/feed.component';
import { QuestsComponent } from './quests/quests.component';
import { PostsComponent } from './posts/posts.component';
import { WritePostComponent } from './write-post/write-post.component';
import { WriteQuestComponent } from './write-quest/write-quest.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { TopUsersComponent } from './top-users/top-users.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HeaderComponent,
    NavigationBarComponent,
    FooterComponent,
    SignUpComponent,
    FeedComponent,
    QuestsComponent,
    PostsComponent,
    WritePostComponent,
    WriteQuestComponent,
    TopUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
