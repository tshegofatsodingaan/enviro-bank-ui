import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent{
  snackBarMessage = 'Funds transferred successfully!';
  durationInSeconds = 2;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private authService: AuthService,
              private route: Router,
              private snackBar: MatSnackBar) {
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
      this.snackBar.open(this.snackBarMessage, 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'success-snackbar'
      })
      });
    }
    return
  }

}
