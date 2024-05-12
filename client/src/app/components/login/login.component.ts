import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usename="";
  password="";
  errorMsgUserName="";
  errorMsgUserPassword="";
  errorMsg="";

  constructor(private authService:AuthService,private router:Router){}

  login(){

    if(this.usename.trim().length===0 && this.password.trim().length===0){
      this.errorMsgUserName="Username is Required";
      this.errorMsgUserPassword="Password is Required";
    }
    else{
      this.errorMsgUserName='';
      this.errorMsgUserPassword='';
    }
    if(this.usename.trim().length===0){
      this.errorMsgUserName="Username is Required";
    }
    else if(this.password.trim().length===0){
      this.errorMsgUserPassword="Password is Required";
    }
    else{
      this.errorMsgUserName='';
      this.errorMsgUserPassword='';

      const user = {
        email: this.usename,
        password: this.password,
      };

      this.authService.login(user).subscribe({
        next: res => {
          if (res.success) {
            this.authService.setUserLogin(true);
            // alert("User Logged in successfully");
            location.href="/";
          }
        },
        error: err => {
          if (!err.error.success) {
            alert("Invalid Email or Password");
          }
        }
      });
    }
  }
}
