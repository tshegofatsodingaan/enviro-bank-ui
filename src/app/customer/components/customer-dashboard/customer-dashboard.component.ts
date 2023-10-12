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
    const enviro_bank_session_String = sessionStorage.getItem('enviro-bank_session');

    if(!!enviro_bank_session_String){
      const enviro_bank_session = JSON.parse(enviro_bank_session_String);

      this.customerService.getAllAccounts(enviro_bank_session.token, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data;
        console.log(this.accounts);
      })
    }
    }


}
