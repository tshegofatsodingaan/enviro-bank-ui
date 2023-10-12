import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {AdminService} from "./services/admin.service";
import {MaterialModule} from "../material/material.module";
import {MatTableModule} from "@angular/material/table";
import { AddClientComponent } from './components/add-client/add-client.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



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
    ReactiveFormsModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
