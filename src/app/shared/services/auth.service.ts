import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private route: Router) { }

  public get session(): any {
    const enviroBankSessionString = sessionStorage.getItem('enviro-bank_session');
    if (enviroBankSessionString) {
      return JSON.parse(enviroBankSessionString);
    }
    return null;
  }

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

  redirectToLogin() {
    sessionStorage.removeItem('enviro_bank_session');
  this.route.navigate(['']);
  }

}
