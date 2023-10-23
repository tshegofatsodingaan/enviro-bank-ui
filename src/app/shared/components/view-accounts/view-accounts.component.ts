import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Customer} from "../../../models/customer.model";
import {Account} from "../../../models/account.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent implements OnInit{

  customer: Customer | undefined;
  accounts: Account[] = [];

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCustomer()
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAllAccounts();
  }

  enviroBankSession = this.authService.session;

  public generateInitials(): string {
    const nameInitial = this.enviroBankSession.name.charAt(0).toUpperCase();
    const surnameInitial = this.enviroBankSession.surname.charAt(0).toUpperCase();
    return nameInitial + surnameInitial;
  }



  public getCustomer(){
    this.authService.getUser(this.enviroBankSession.id).subscribe( data => {
      this.customer = data
      console.log(this.customer)
      }
    );
  }

  public getAllAccounts() {
    this.authService.getAllAccounts(this.enviroBankSession.id, {size: 3, page: 0}).subscribe( data => {
      this.accounts = data
      console.log(this.accounts)
    })
  }



}
