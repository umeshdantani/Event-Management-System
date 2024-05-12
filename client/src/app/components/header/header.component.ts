import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Event } from '../../Event';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn:boolean = false;

  constructor(private authService: AuthService, 
    private eventService:EventService,
    private router: Router) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  
  logout() {
    this.authService.logout().subscribe({
      next: (res:any) => {
        this.isUserLoggedIn = false;
        this.authService.setUserLogin(false);
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
