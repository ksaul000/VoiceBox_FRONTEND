import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VoiceBox';
  showLogIn: boolean = true;
  showFeed: boolean = false;
  showSignUp: boolean = false;
  userId: number = -1;

  logInIntoFeed(id:number): void{
    this.showLogIn = false;
    this.showSignUp = false;
    this.showFeed = true;
    this.userId = id;
  }

  goIntoSignUp(): void{
    this.showLogIn = false;
    this.showSignUp = true;
    this.showFeed = false;
  }

  goIntoLogIn(): void{

    this.showLogIn = true;
    this.showSignUp = false;
    this.showFeed = false;
    this.userId = -1;
  }


}

