import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Output() goInLogInEmiter: any = new EventEmitter();

  nickname: string = '';
  email: string = '';
  password: string = '';
  passwordReEnter: string = '';
  nicknameError = false;
  emailError = false;
  passwordError = false;
  reEnterPasswordError = false;

  constructor(private service: AppService) { }

  ngOnInit(): void {
  }

  createUser(){
    
  }

  goInLogIn(){
    this.goInLogInEmiter.emit()
  }

  signIn() {

    this.nicknameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.reEnterPasswordError = false;
    const body = {nickname: this.nickname, email: this.email, password: this.password, reentered_password: this.passwordReEnter};
    this.service.createUser(body).subscribe(
      (response:any) => {
        this.goInLogInEmiter.emit()
      },
      (error) => {
        const errorMesages = error.error.errorMesages.join("\n");
        alert(errorMesages);
        if (errorMesages.includes('Nickname') || errorMesages.includes('nickname') ) {
          this.nicknameError = true;
        }
        if (errorMesages.includes('Email') || errorMesages.includes('email') ) {
          this.emailError = true;
        }
        if (errorMesages.includes('Password') ) {
          this.passwordError = true;
        }
        if (errorMesages.includes('Re-entered') ) {
          this.reEnterPasswordError = true;
        }
      }
    );
  }


}
