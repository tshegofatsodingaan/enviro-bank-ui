import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  private signIn(credentials: any): Observable<any>{
    return this.http.post<any>("/api/v1/auth/sign-in", JSON.stringify(credentials), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
