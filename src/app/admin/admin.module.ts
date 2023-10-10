import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {AdminService} from "./services/admin.service";
import {MaterialModule} from "../material/material.module";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
