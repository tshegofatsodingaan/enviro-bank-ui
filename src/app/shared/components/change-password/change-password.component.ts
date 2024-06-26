import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-change-password-before-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordFormGroup: FormGroup = new FormGroup({});
  durationInSeconds = 2;
  snackBarMessage = 'Password updated successfully!'
  invalidCredentials: boolean = false;
  passwordMismatch = false;
  strongPasswordPolicy = false;
  linkExpired = false;

  constructor(private route: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }


  public changePassword() {
    if (this.changePasswordFormGroup.valid) {
      const passwords = {
        newPassword: this.changePasswordFormGroup.get('newPassword')?.value as string,
        confirmPassword: this.changePasswordFormGroup.get('confirmPassword')?.value as string
      }
      this.invalidCredentials = false;
      this.strongPasswordPolicy = false;
      this.linkExpired = false;

      if(passwords.newPassword != passwords.confirmPassword){
        this.passwordMismatch = true;
      } else {
        const userToken = this.activatedRoute.snapshot.queryParams['token'];
        this.authService.changePasswordBeforeLogin(passwords, userToken).subscribe((data) => {
          this.invalidCredentials = false;
          this.strongPasswordPolicy = false;
          this.linkExpired = false;
          this.toast.success({detail: "Success", summary: "Password changed successfully.", duration: 5000});
          this.route.navigateByUrl('');
        }, (error) => {

          if (error.status == 401) {
            this.invalidCredentials = true;
          }
          if(error.status == 400) {
            this.strongPasswordPolicy = true;
          }
          if(error.status == 404){
            this.linkExpired = true;
          }
        });
      }

    }
  }
}
