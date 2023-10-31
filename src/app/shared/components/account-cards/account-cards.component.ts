import { Component } from '@angular/core';
import {Account} from "../../../models/account.model";
import {CustomerService} from "../../../customer/services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Customer} from "../../../models/customer.model";

@Component({
  selector: 'app-account-cards',
  templateUrl: './account-cards.component.html',
  styleUrls: ['./account-cards.component.css']
})
export class AccountCardsComponent {

  accounts: Account[] = []
  customer: Customer | undefined;

  constructor(private customerService: CustomerService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }


  ngOnInit(): void {
    this.getCustomer();
    const enviro_bank_session_String = sessionStorage.getItem('enviro-bank_session');
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.authService.getAllAccounts(id, {size: 3, page: 0}).subscribe( data => {
        this.accounts = data;
        if(this.accounts.length != 0){
          // this.viewAccounts = true
        }
      });
    }
    if(!!enviro_bank_session_String){
      const enviro_bank_session = JSON.parse(enviro_bank_session_String);
      this.customerService.getAllAccounts(enviro_bank_session.token, enviro_bank_session.id, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data;
      })
    }
  }

  public getCustomer(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.authService.getUser(id).subscribe( data => {
        this.customer = data
      });
    }
  }

  transferFunds() {
    this.route.navigateByUrl('shared/transfer-funds');
  }


}
