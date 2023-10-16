import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getAllAccounts(token: string, id: string, params: { size: number; page: number }): Observable<Account[]> {
    return this.http.get<Account[]>('/api/v1/accounts?id=' + id, {
      params, // for pagination
    });
  }

  public transferFunds(token: string, transferDetails: any): Observable<void>{
    return this.http.post<void>('/api/v1/transactions/transfer', JSON.stringify(transferDetails), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
