import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Event } from '../../Event';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName:string="";

  constructor(private authService: AuthService, 
    private eventService:EventService,
    private cookieService: CookieService,
    private router: Router) { }

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
          this.userName = "";
        }
      }
    });
  }
  
  logout() {
    this.authService.logout().subscribe({
      next: (res:any) => {
        this.userName = "";
        this.authService.setUserStatus(null);
        this.router.navigate(["/home-page"]);
      },
      error: (err:any) => {
        if (!err.success) {
          alert("User not logged in");
          this.router.navigate(["/home-page"]);
        }
      }
    });
  }

  newData(event:any){
    event.preventDefault();
    this.eventService.setter(new Event());
    this.router.navigate(['/add-data']);
  }

  displayData(){
    this.eventService.displayData();
  }
}
