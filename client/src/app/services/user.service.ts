import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:5000/api/users";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
    credentials: 'include',
  };

  // Get a User Details
  getUser(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id = "123456789"}`
    return this.http.get<any>(url, this.httpOptions);
  }

  // Delete a User
  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  // Edit a User
  editUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user._id}`;
    return this.http.put<any>(url, user, this.httpOptions);
  }
}
