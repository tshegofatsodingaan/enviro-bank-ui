import { Injectable } from '@angular/core';
import {Account} from "../../models/account.model";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "../../models/customer.model";
import {Transactions} from "../../models/transactions.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient){}

  public getUser(id: string): Observable<Customer> {
    return this.http.get<Customer>('/api/v1/customers?id=' + id, {
    });
  }

  public updateUser(id: string, userDetails: any): Observable<any> {
    return this.http.put<any>('/api/v1/customers/' + id, JSON.stringify(userDetails),{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  public getAllAccounts(id: string, params: { size: number; page: number }): Observable<Account[]> {
    return this.http.get<Account[]>('/api/v1/accounts?id=' + id, {
      params, // for pagination
    });
  }

  public getOneAccount(accountNumber: string): Observable<Account[]> {
    return this.http.get<Account[]>('/api/v1/accounts?accountNum=' + accountNumber);
  }

  public getAllTransactions(accountNumber: string): Observable<Transactions[]>{
    return this.http.get<Transactions[]>('/api/v1/transactions/' + accountNumber);
  }

}
