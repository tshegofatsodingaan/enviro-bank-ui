import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent{

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private authService: AuthService) {
  }


  transferFundsFormGroup = this.formBuilder.group({
    accountNum: ['', [Validators.required]],
    receiverAccountNum: ['', [Validators.required]],
    typeOfTransaction: ['TRANSFER'],
    transactionAmount: ['', [Validators.required]]
  })

  transfer(){
    if(this.transferFundsFormGroup.valid){
      // const transferDetails = {
      //   accountNum: this.transferFundsFormGroup.get('accountNumber')?.value as string,
      //   receiverAccountNum: this.transferFundsFormGroup.get('receiverAccountNumber')?.value as string,
      //   typeOfTransaction: this.transferFundsFormGroup.get('transactionType')?.value as string,
      //   transactionAmount: this.transferFundsFormGroup.get('amount')?.value as bigint,
      // }
      const enviro_bank_session = this.authService.session

      this.customerService.transferFunds(enviro_bank_session.token, this.transferFundsFormGroup.value).subscribe(data => {
        console.log(data);
      });
    }
    return
  }

}
