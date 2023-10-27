import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  public dialogDetails: { title?: string, content?: string } = {};
  snackBarMessage = 'Success!';
  durationInSeconds = 2;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.dialogDetails = data;
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
