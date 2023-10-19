import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Account} from "../../models/account.model";
import {Customer} from "../../models/customer.model";

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

  public updateUser(id: string, userDetails: any): Observable<any> {
    return this.http.put<any>('/api/v1/customers/' + id, JSON.stringify(userDetails),{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  public getUser(id: string): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/v1/customers?id=' + id, {
    });
  }

  public getAllUsers(): Observable<any>{
    return this.http.get<any>('/api/v1/users/all-users', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  redirectToLogin() {
  sessionStorage.removeItem('enviro_bank_session');
  this.route.navigate(['']);
  }

  redirectToChangePassword() {
    this.route.navigateByUrl('change-password')
  }
}
