import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {CustomerService} from "./services/customer.service";
import {MaterialModule} from "../material/material.module";
import { TransferComponent } from './components/transfer/transfer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthorizedRoute} from "../shared/security/authorized-routs";
import {RouterModule} from "@angular/router";


export const customerRoutes: AuthorizedRoute[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: CustomerDashboardComponent
  },
  {
    path: 'transfer-funds',
    component: TransferComponent
  }
];


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(customerRoutes),
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
