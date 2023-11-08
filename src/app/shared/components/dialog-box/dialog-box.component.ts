import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{

  public dialogDetails: { title?: string, content?: string } = {};
  snackBarMessage = 'Success!';
  durationInSeconds = 2;
  hideContinueButton = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
    this.dialogDetails = data;
  }

  ngOnInit(): void {

    if(this.dialogDetails.title == 'Warning'){
      this.hideContinueButton = true;
    }
  }

  onClickCancel() {
  }

  onClickContinue() {
    this.snackBar.open(this.snackBarMessage, 'Close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'success-snackbar'
    })
  }



}
