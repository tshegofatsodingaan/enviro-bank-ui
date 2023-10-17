import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {AdminService} from "./services/admin.service";
import {MaterialModule} from "../material/material.module";
import {MatTableModule} from "@angular/material/table";
import { AddClientComponent } from './components/add-client/add-client.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthorizedRoute} from "../shared/security/authorized-routs";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


export const adminRoutes: AuthorizedRoute[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'create-new-client',
    component: AddClientComponent
  },
];


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddClientComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
