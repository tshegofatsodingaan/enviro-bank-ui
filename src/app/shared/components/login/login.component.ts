import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  invalidCredentials: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router,) {
  }


  signInFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })


  public signIn(): void {
    if(this.signInFormGroup.valid){
      this.authService.signIn(this.signInFormGroup.value).subscribe((data) => {
        sessionStorage.setItem("enviro-bank_session", JSON.stringify(data));

        const enviro_bank_session = this.authService.session;
        console.log(enviro_bank_session);

        if(enviro_bank_session.roles[0] == "USER"){
          this.route.navigateByUrl('customer/dashboard');
        } else{
          this.route.navigateByUrl('admin/dashboard');
        }

      }, (error) => {
        if (error.status === 401){
          this.invalidCredentials = true;
          console.log( 'status code', error.status)
        }
      } )

    }
    return
  }


  public requestReset(): void{
    this.route.navigateByUrl('reset-password')
  }
}
