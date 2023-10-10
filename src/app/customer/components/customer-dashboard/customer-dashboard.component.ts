import {Component, OnInit} from '@angular/core';
import {Account} from "../../../models/account.model";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit{

  accounts: Account[] = []

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getAllAccounts({ size: 3, page: 0}).subscribe(data => {
      this.accounts = data;
    })
  }
}
