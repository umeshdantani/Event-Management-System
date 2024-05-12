import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../Event';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent {

  public eventDetails:Event=new Event();
  constructor(private eventService:EventService,private router:Router) { }

  ngOnInit(): void {
    this.eventDetails=this.eventService.getter();
    this.eventDetails.eventDetailsData.eventDetailDate = this.eventDetails.eventDetailsData.eventDetailDate?.split("T")[0];
    this.geteventType();
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
    console.log(this.eventDetails.eventType);
    
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
