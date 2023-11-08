import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  durationInSeconds = 2;
  snackBarMessage = 'An email has been sent.'

  resetPasswordFormGroup: FormGroup = new FormGroup({})

  invalidCredentials: boolean = false

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.resetPasswordFormGroup = this.formBuilder.group({
      "email": ['', [Validators.required]]
    })
  }

  public displaySnackBar() {
    this.snackBar.open(this.snackBarMessage, 'Close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'success-snackbar'
    })
  }

  public resetPassword(): void {
    if (this.resetPasswordFormGroup.valid) {
      const user = {
        email: this.resetPasswordFormGroup.get('email')?.value as string
      }
      this.authService.resetPassword(user).subscribe((data) => {

      }, (error) => {
        if (error.status === 401) {
          console.log(error.status)
          this.invalidCredentials = true;
        } else{
          this.invalidCredentials = true;
          // this.displaySnackBar();
        }
      });
    }
  }

}
