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
  private headers=new HttpHeaders().set('Content-Type','application/json');
  constructor(private router: Router,private http:HttpClient) { }

  createEvent(event:Event){
    return this.http.post(this.baseUri+'/add-data',event,{headers:this.headers});
  }

  readEvent(){
    return this.http.get(this.baseUri+'/display-data',{headers:this.headers});
  }

  updateEvent(event:Event,id:String){
    return this.http.put(this.baseUri+'/update-data/'+id,event,{headers:this.headers});
  }

  deleteEvent(id:string){
    return this.http.delete(this.baseUri+'/delete/'+id,{headers:this.headers});
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
