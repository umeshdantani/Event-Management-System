import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { Event } from '../../Event';

@Component({
  selector: 'app-display-data',
  standalone: true,
  imports: [],
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.css'
})
export class DisplayDataComponent {
  public events:Event[]=[];
  public avgAttendeeCount:number=0;
  constructor(private eventDataService:EventService,private router:Router) { }

  ngOnInit(): void {
    this.readEvent();
  }

    calculateAvgAttendee(){
      let sum:number=0;
      this.events.forEach(event=>{
        sum += event.attendeeCount;
      })
      this.avgAttendeeCount=this.events.length > 0 ? sum / this.events.length:0;
      this.avgAttendeeCount=Number(this.avgAttendeeCount.toFixed(2))
    }

  //   getSkills(element: any): string {
  //     let eventDetails = "";
  
  //     element.forEach((data:any) => {
  //       eventDetails += data.eventDetailName + ", ";
  //       eventDetails += data.eventDetailLocation + ", ";
  //       eventDetails += data.eventDetailDate + ", ";
  //     })
  
  //     return eventDetails;
  // }

  readEvent(){
    this.eventDataService.readEvent().subscribe({
      next:data=>{
        this.events=(<any>data)['msg'];
        this.calculateAvgAttendee();
      },
      error:error=>{
        console.log(error);
      }
    }
    )
  }

  doUpdate(event:any){
    // event.events.eventType=event.events.eventType.filter((x:any)=>x.isSelected===true).map((x:any)=>x.name);
    console.log(event.eventDetailsData);
    this.eventDataService.setter(event);
    this.router.navigate(["/add-data"]);
  }

  doDelete(event:any){
    if (confirm(`Are you confirm ID No. ${event._id} record delete?`) === true){
    this.eventDataService.deleteEvent(event._id).subscribe({
      next:()=>{
        this.events.splice(this.events.indexOf(event),1);
        this.calculateAvgAttendee();
      },
      error:error=>{
        console.log(error);
      }
    })
  }
  }

}
