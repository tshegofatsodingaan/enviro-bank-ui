import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../models/customer.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Account} from "../../../models/account.model";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit{

  customer: Customer | undefined;
  accounts: Account[] = [];
  // account: Account | undefined;
  initials = '';

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getAllAccounts();
    this.getAccountByAccountNumber();
    this.sharedService.getAccount();
    console.log(this.sharedService.getAccount());
  }

  public getUser(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.authService.getUser(id).subscribe(data => {
        this.customer = data
        const name = this.customer.name.charAt(0).toUpperCase();
        const surname = this.customer.surname.charAt(0).toUpperCase();
        this.initials =  name + surname
      });
    }
  }

  public getAllAccounts() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.authService.getAllAccounts(id, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data
      });
    }
  }

  public getAccountByAccountNumber(){
    let accountNum = this.activatedRoute.snapshot.paramMap.get('accountNumber');
    if(accountNum){
      this.authService.getOneAccount(accountNum).subscribe(data => {
        this.accounts = data
        console.log("Account: ", typeof this.accounts)
      });
    }
  }


}
