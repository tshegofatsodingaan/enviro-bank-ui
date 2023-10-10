import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  resetPasswordFormGroup: FormGroup = new FormGroup({})

  invalidCredentials: boolean = false
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.resetPasswordFormGroup = this.formBuilder.group({
      "email": ['', [Validators.required]]
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
