import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordFormGroup: FormGroup

  invalidCredentials: boolean = false
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.resetPasswordFormGroup = this.formBuilder.group({
      "email": ['tshego@gmail.com', [Validators.required]]
    })
  }

  public resetPassword(): void {
    if (this.resetPasswordFormGroup.valid) {
      const user = {
        email: this.resetPasswordFormGroup.get('email')?.value as string
      }
      this.authService.resetPassword(user).subscribe(data =>{
        console.log("email has been sent.")
      }, (error) =>{
        if (error.status === 403){
          this.invalidCredentials = true
        }
      });
    }
  }
}
