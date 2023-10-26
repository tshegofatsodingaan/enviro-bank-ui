import { Injectable } from '@angular/core';
import {Account} from "../../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  accountDetails: Account | undefined;

  setAccount(value: any){
    this.accountDetails = value;
  }

  getAccount(){
    return this.accountDetails;
  }

}
