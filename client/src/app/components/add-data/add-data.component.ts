import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../Event';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent {

  public eventDetails:Event=new Event();
  userName: string = "";
  constructor(private eventService:EventService,private authService: AuthService, 
    private router: Router, 
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.eventDetails=this.eventService.getter();
    this.eventDetails.eventDetailsData.eventDetailDate = this.eventDetails.eventDetailsData.eventDetailDate?.split("T")[0];
    this.geteventType();
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

  geteventType(){
    this.eventDetails.eventType=[
      {name:"Meeting",isSelected:false},
      {name:"Party",isSelected:false},
      {name:"Sports",isSelected:false},
      {name:"Concert",isSelected:false},
      {name:"Others",isSelected:false}
    ]
  }

onSubmit() {
  this.eventDetails.eventType=this.eventDetails.eventType.filter(x=>x.isSelected===true).map(x=>x.name);
    
    if(this.eventDetails._id===undefined){
      this.eventService.createEvent(this.eventDetails).subscribe({
        next:(data)=>{
          console.log(data);
          this.router.navigate(["/display-data"]);
        },
        error:error=>{
          console.log(error);
        }
      }
      )
    }
    else{
      this.eventService.updateEvent(this.eventDetails,this.eventDetails._id).subscribe({
        next:(data)=>{
          console.log(data);
          this.router.navigate(["/display-data"]);
        },
        error:error=>{
          console.log(error);
        }
      }
      )
    }
  }
}
