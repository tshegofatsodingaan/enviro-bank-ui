import {AccountType} from "../enums/account-type.enum";

export class Transactions {

  typeOfTransaction: AccountType = AccountType.TRANSFER;
  transactionAmount = 0;
  receiverAmount = 0;
  dateOfTransaction: Date | undefined;


}
