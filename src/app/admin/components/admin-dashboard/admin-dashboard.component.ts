import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Customer} from "../../../models/customer.model";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  customers: Customer[] = [];

  displayedColumns: string[] = ['name', 'surname', 'email', 'numberOfAccounts', 'actions'];
  dataSource = new MatTableDataSource(this.customers);

  constructor(private adminService: AdminService, private authService: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    const enviro_bank_session = this.authService.session;

    this.adminService.getAllCustomers(enviro_bank_session.token).subscribe(data => {
      this.customers = data;
    })

  }

  addNewClient() {
    this.route.navigateByUrl('admin/create-new-client')
  }

}
