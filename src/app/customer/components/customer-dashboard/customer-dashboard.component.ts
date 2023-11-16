import {Component, OnInit} from '@angular/core';
import {Account} from "../../../models/account.model";
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit{

  accounts: Account[] = [];
  isAccountEmpty: boolean = false;


  constructor(private customerService: CustomerService,
              private authService: AuthService) {
  }


  ngOnInit(): void {
    const enviro_bank_session_String = sessionStorage.getItem('enviro-bank_session');

    if(!!enviro_bank_session_String){
      const enviro_bank_session = JSON.parse(enviro_bank_session_String);

      this.customerService.getAllAccounts(enviro_bank_session.token, enviro_bank_session.id, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data;
        if(this.accounts.length == 0){
          this.isAccountEmpty = true;
        }
        console.log(this.accounts);
      })
    }
    }

  public signOut(){
    this.authService.redirectToLogin();
  }

}
