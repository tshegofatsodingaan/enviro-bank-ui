import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Account} from "../../models/account.model";
import {Customer} from "../../models/customer.model";
import {Transactions} from "../../models/transactions.model";

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

  public changePasswordBeforeLogin(password: { newPassword: string; confirmPassword: string }, jwtToken: String): Observable<any>{
    return this.http.post<any>('/api/v1/auth/change-password?token='+jwtToken, JSON.stringify(password), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  redirectToLogin() {
  sessionStorage.removeItem('enviro-bank_session');
  this.route.navigate(['']);
  }

  redirectToChangePassword() {
    this.route.navigateByUrl('update-password');
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
