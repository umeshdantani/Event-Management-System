import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swiper from 'swiper';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName: string = "";

  constructor(private authService: AuthService, 
    private router: Router, 
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: res => {
        if (res.success) {
          const user = res.data;
          this.userName = user.first_name + " " + user.last_name;
        }
      },
      error: err => {
        if (!err.success) {
          this.cookieService.delete("access_token");
          this.router.navigate(["/login"]);
        }
      }
    });
  }
  }
