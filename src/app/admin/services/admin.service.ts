import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getAllCustomers(token: string): Observable<Customer[]>{
    return this.http.get<Customer[]>('/api/v1/customers/everyone');
  }

  public addNewClient(token: string, userDetails: any): Observable<any>{
    return this.http.post<any>('/api/v1/customers', JSON.stringify(userDetails), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
