import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {CustomerService} from "./services/customer.service";
import {MaterialModule} from "../material/material.module";
import { TransferComponent } from './components/transfer/transfer.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
