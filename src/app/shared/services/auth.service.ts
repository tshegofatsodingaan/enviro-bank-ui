import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signIn(credentials: any): Observable<any>{
    return this.http.post<any>("/api/v1/auth/sign-in", JSON.stringify(credentials), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public resetPassword(user: any): Observable<any>{
    return this.http.post<any>('/api/v1/auth/reset-password', JSON.stringify(user),{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public changePassword(password: { newPassword: string; confirmPassword: string }, jwtToken: String): Observable<any>{

    return this.http.post<any>('/api/v1/auth/change-password?token='+jwtToken, JSON.stringify(password), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

}