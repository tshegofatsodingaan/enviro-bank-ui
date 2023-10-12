import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {CustomerService} from "./services/customer.service";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
