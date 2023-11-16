import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../../customer/services/customer.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {Location} from "@angular/common";
import {NgToastService} from "ng-angular-popup";

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
              private location: Location,
              private toast: NgToastService) {
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
        this.transfer();
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

    })
  }

  promptUser(){
    this.dialogPopUpForConfirmation();
  }

  transfer() {
    if (this.transferFundsFormGroup.valid) {
      const enviro_bank_session = this.authService.session;
      this.customerService.transferFunds(enviro_bank_session.token, this.transferFundsFormGroup.value as string).subscribe(data => {
        this.toast.success({detail: "Success", summary: "Funds transferred successfully.", duration: 5000});
        this.location.back();
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
