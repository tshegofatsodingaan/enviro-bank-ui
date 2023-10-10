import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {AdminService} from "./services/admin.service";



@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AdminService

  ]
})
export class AdminModule { }
