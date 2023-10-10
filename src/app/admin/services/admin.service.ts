import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>('/api/v1/customers', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
