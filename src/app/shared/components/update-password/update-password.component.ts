import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  changePasswordFormGroup: FormGroup = new FormGroup({});
  uniquePassword: boolean = false;
  durationInSeconds = 2;
  snackBarMessage = 'Password updated successfully!'
  passwordMismatch = false;
  strongPasswordPolicy = false;

  constructor(private route: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
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

  public changePassword() {
    if (this.changePasswordFormGroup.valid) {
      const passwords = {
        newPassword: this.changePasswordFormGroup.get('newPassword')?.value as string,
        confirmPassword: this.changePasswordFormGroup.get('confirmPassword')?.value as string
      }
      this.strongPasswordPolicy = false;
      this.passwordMismatch = false;
      this.uniquePassword = false;
      if (passwords.newPassword != passwords.confirmPassword){
        this.passwordMismatch = true;
      } else{
        const tokenSession = this.authService.session;
        this.authService.changePassword(passwords, tokenSession.token).subscribe((data) => {
          this.displaySnackBar();
        }, (error) => {
          if (error.status == 401) {
            this.uniquePassword = true
          }
          if(error.status == 400) {
            this.strongPasswordPolicy = true;
          }
        })
      }


    }
  }

}
