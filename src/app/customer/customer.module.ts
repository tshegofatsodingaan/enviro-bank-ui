import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {CustomerService} from "./services/customer.service";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthorizedRoute} from "../shared/security/authorized-routs";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


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
  // {
  //   path: 'transfer-funds',
  //   component: TransferComponent
  // }
];


@NgModule({
  declarations: [
    CustomerDashboardComponent,
  ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(customerRoutes),
        SharedModule,
    ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
