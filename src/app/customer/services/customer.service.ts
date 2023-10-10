import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getAllAccounts(params: { size: number; page: number }): Observable<Account[]> {
    return this.http.get<Account[]>('/api/v1/accounts', {
      params, // for pagination
    });
  }

}
