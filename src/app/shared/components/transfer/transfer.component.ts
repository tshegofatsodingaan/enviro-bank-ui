import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../../customer/services/customer.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent{



  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private authService: AuthService,
              private route: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }


  transferFundsFormGroup = this.formBuilder.group({
    accountNum: ['', [Validators.required]],
    receiverAccountNum: ['', [Validators.required]],
    typeOfTransaction: ['TRANSFER'],
    transactionAmount: ['', [Validators.required]]
  })

  dialogPopUp(){
    const mdConfig = new MatDialogConfig();
    mdConfig.width = '400px';
    mdConfig.data = {
      title: 'Confirm',
      content: 'Are you sure you want to proceed with this transaction?'
    }
    const dialogReference = this.dialog.open(DialogBoxComponent, mdConfig);
    dialogReference.afterClosed().subscribe(result => {
      this.transferFundsFormGroup.reset();
    })
  }

  transfer(){
    if(this.transferFundsFormGroup.valid){
      const enviro_bank_session = this.authService.session;
      this.customerService.transferFunds(enviro_bank_session.token, this.transferFundsFormGroup.value as string).subscribe(data => {
        this.dialogPopUp();

      });
    }
    return
  }

}
