import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../User";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isUserLoggedIn:boolean = false;
  user: any = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    const token = this.cookieService.get("access_token");
    this.isUserLoggedIn = token ? true : false;
   }

  private apiUrl = "http://localhost:5000/api/auth";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer " + this.cookieService.get("token")
    }),
    withCredentials: true,
    credentials: 'include',
  };

  // Get a User Details
  getUser(): Observable<any> {
    const url = `${this.apiUrl}/user`
    return this.http.get<any>(url, this.httpOptions);
  }

  login(user: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, user, this.httpOptions);
  }

  register(user: User): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, user, this.httpOptions);
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  setUserStatus(user:any) {
    this.user = user;
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get("access_token");
    this.isUserLoggedIn = token ? true : false;
    return this.isUserLoggedIn;
  }
}
