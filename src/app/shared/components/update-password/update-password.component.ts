import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgToastService} from "ng-angular-popup";
import {Location} from "@angular/common";

@Component({
  selector: 'app-change-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  changePasswordFormGroup: FormGroup = new FormGroup({});
  uniquePassword: boolean = false;
  passwordMismatch = false;
  strongPasswordPolicy = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toast: NgToastService,
              private location: Location) {
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
      this.strongPasswordPolicy = false;
      this.passwordMismatch = false;
      this.uniquePassword = false;
      if (passwords.newPassword != passwords.confirmPassword){
        this.passwordMismatch = true;
      } else{
        const tokenSession = this.authService.session;
        this.authService.changePassword(passwords, tokenSession.token).subscribe((data) => {
          this.toast.success({detail: 'Success', summary: 'Password Changed Successfully', duration: 5000});
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
