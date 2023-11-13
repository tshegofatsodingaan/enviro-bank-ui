import {AccountType} from "../enums/account-type.enum";

export class Account {
  id = 0;
  accountNum = 0;
  accountType: AccountType = AccountType.WITHDRAW;
  accountBalance = 0;
  availableBalance = 0;
  active = true;
  customerNum = '';

}
