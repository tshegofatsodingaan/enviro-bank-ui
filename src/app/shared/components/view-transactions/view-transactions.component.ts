import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../models/customer.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Account} from "../../../models/account.model";
import {SharedService} from "../../services/shared.service";
import {Transactions} from "../../../models/transactions.model";

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit{

  customer: Customer | undefined;
  accounts: Account[] = [];
  singleAccount: Account[] = [];
  transactions: Transactions[] = [];
  initials = '';
  showPersonalDetails = false;
  noTransactions = false;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != 'null'){
      this.getUser();
      this.getAllAccounts();
    }
    if(id === 'null'){
      this.getAccountsBySessionUser();
    }
    this.getAccountByAccountNumber();
    this.getAllTransactions();
  }

  public getUser(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.showPersonalDetails = true;
    if(id){
      // this.showPersonalDetails = true;
      this.sharedService.getUser(id).subscribe(data => {
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
      this.sharedService.getAllAccounts(id, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data
      });
    }
  }

  public getAccountsBySessionUser(){
    const session = this.authService.session
    this.sharedService.getAllAccounts(session.id, {size: 3, page: 0}).subscribe(data => {
      this.accounts = data
    });
  }

  public getAccountByAccountNumber(){
    let accountNum = this.activatedRoute.snapshot.paramMap.get('accountNumber');
    if(accountNum){
      this.sharedService.getOneAccount(accountNum).subscribe(data => {
        this.singleAccount = data
      });
    }
  }

  public getAllTransactions(){
    let accountNum = this.activatedRoute.snapshot.paramMap.get('accountNumber');
    if (accountNum) {
      this.sharedService.getAllTransactions(accountNum).subscribe(data => {
        this.transactions = data;
        console.log(this.transactions)
        if(this.transactions.length === 0){
          this.noTransactions = true;
        }
      })
    }
  }

}
