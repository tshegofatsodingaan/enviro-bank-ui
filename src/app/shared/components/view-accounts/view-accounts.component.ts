import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../models/customer.model";
import {Account} from "../../../models/account.model";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent implements OnInit{

  customer: Customer | undefined;
  accounts: Account[] = [];
  initials = '';
  viewAccounts = false;

  constructor(private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getAllAccounts();

  }


  public getCustomer(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.sharedService.getUser(id).subscribe( data => {
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
      this.sharedService.getAllAccounts(id, {size: 3, page: 0}).subscribe( data => {
        this.accounts = data;
        if(this.accounts.length != 0){
          this.viewAccounts = true
        }
      });
    }
  }



}
