import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Customer} from "../../../models/customer.model";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  customers: Customer[] = []

  displayedColumns: string[] = ['name', 'surname', 'email', 'idNumber', 'phoneNumber'];
  dataSource = this.customers;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getAllCustomers().subscribe(data => {
      this.customers = data;
    })
  }

}
