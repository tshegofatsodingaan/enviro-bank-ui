import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {CustomerService} from "./services/customer.service";



@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
