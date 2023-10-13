import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent{

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private authService: AuthService,
              private route: Router) {
  }


  transferFundsFormGroup = this.formBuilder.group({
    accountNum: ['', [Validators.required]],
    receiverAccountNum: ['', [Validators.required]],
    typeOfTransaction: ['TRANSFER'],
    transactionAmount: ['', [Validators.required]]
  })

  transfer(){
    if(this.transferFundsFormGroup.valid){
      const enviro_bank_session = this.authService.session;
      this.customerService.transferFunds(enviro_bank_session.token, this.transferFundsFormGroup.value as string).subscribe(data => {
      this.route.navigateByUrl('customer/dashboard');
      });
    }
    return
  }

}
