import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  email: string = '';
  password: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  @Output() logInEmiter = new EventEmitter();
  @Output() goInSignUp = new EventEmitter();

  constructor(private service: AppService) { }

  ngOnInit(): void {

  }

  users: any = [];


  logIn() {
    const body = {email: this.email, password: this.password};
    this.emailError = false;
    this.passwordError = false;
    this.service.logInUser(body).subscribe(
      (response:any) => {
        // Handle the response here
        this.logInEmiter.emit(response.id)
      },
      (error) => {
        // Handle the error message here
        alert(error.error.message);
        if (error.error.message.includes('email')) {
          this.emailError = true;
          this.passwordError = true;
        }
        if (error.error.message.includes('password')) {
          this.passwordError = true;
        }
      }
    );
  }

  goIntoSignUp(){
    this.goInSignUp.emit();
  }

}
