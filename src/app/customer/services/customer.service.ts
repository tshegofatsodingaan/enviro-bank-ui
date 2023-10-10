import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('/api/v1/accounts', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
