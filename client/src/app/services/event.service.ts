import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public eventDetails:Event=new Event();
  private baseUri:string="http://localhost:5000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
    credentials: 'include',
  };
  constructor(private router: Router,private http:HttpClient) { }

  createEvent(event:Event){
    return this.http.post(this.baseUri+'/add-data',event,this.httpOptions);
  }

  readEvent(){
    return this.http.get(this.baseUri+'/display-data',this.httpOptions);
  }

  updateEvent(event:Event,id:String){
    return this.http.put(this.baseUri+'/update-data/'+id,event,this.httpOptions);
  }

  deleteEvent(id:string){
    return this.http.delete(this.baseUri+'/delete/'+id,this.httpOptions);
  }

  setter(event:Event){
    this.eventDetails=event;
  }

  getter(){
    return this.eventDetails;
  }

  displayData(){
    this.router.navigate(['display-data']);
  }
}
