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

  accounts: Account[] = []


  constructor(private customerService: CustomerService,
              private authService: AuthService,
              private route: Router) {
  }

  public generateInitials(): string {
    const enviroBankSession = this.authService.session

    const nameInitial = enviroBankSession.name.charAt(0).toUpperCase();
    const surnameInitial = enviroBankSession.surname.charAt(0).toUpperCase();
    console.log("initials: ", nameInitial + surnameInitial)
    return nameInitial + surnameInitial;
  }

  ngOnInit(): void {
    const enviro_bank_session_String = sessionStorage.getItem('enviro-bank_session');

    if(!!enviro_bank_session_String){
      const enviro_bank_session = JSON.parse(enviro_bank_session_String);

      this.customerService.getAllAccounts(enviro_bank_session.token, enviro_bank_session.id, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data;
      })
    }
    }


  transferFunds() {
    this.route.navigateByUrl('customer/transfer-funds');
  }
}
