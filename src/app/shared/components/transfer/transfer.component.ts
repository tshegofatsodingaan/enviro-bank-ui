import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../../customer/services/customer.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {


  insufficientFunds = false;


  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private authService: AuthService,
              private dialog: MatDialog,
              private location: Location) {
  }


  transferFundsFormGroup = this.formBuilder.group({
    accountNum: ['', [Validators.required]],
    receiverAccountNum: ['', [Validators.required]],
    transactionAmount: ['', [Validators.required]]
  })

  dialogPopUpForConfirmation() {
    const mdConfig = new MatDialogConfig();
    mdConfig.width = '400px';
    mdConfig.data = {
      title: 'Confirm',
      content: 'Are you sure you want to transfer R'+ this.transferFundsFormGroup.value.transactionAmount + '?'
    }
    const dialogReference = this.dialog.open(DialogBoxComponent, mdConfig);
    dialogReference.afterClosed().subscribe(result => {
      if(result === true){
       // this.transfer();
        this.location.back();
      }

    })
  }

  dialogForInsufficientFunds() {
    const mdConfig = new MatDialogConfig();
    mdConfig.width = '400px';
    mdConfig.data = {
      title: 'Warning',
      content: 'You have insufficient funds for this transaction.'
    }
    const dialogReference = this.dialog.open(DialogBoxComponent, mdConfig);
    dialogReference.afterClosed().subscribe(result => {
      if(result == false){
        this.location.back();
      }
    })
  }


  transfer() {
    if (this.transferFundsFormGroup.valid) {
      const enviro_bank_session = this.authService.session;
      this.dialogPopUpForConfirmation();
      this.customerService.transferFunds(enviro_bank_session.token, this.transferFundsFormGroup.value as string).subscribe(data => {
      }, (error) => {
        if (error.status === 400) {
          this.insufficientFunds = true;
          this.dialogForInsufficientFunds();
        }
      });
    }
    return
  }

}
