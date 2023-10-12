import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {CustomerService} from "./services/customer.service";
import {MaterialModule} from "../material/material.module";
import { TransferComponent } from './components/transfer/transfer.component';



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    TransferComponent
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
