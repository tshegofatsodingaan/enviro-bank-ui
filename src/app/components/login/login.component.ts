import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  signInFormGroup: FormGroup = new FormGroup({});

  invalidCredentials: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router,) {
  }

  ngOnInit(): void {
    this.signInFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  public signIn(): void {
    if(this.signInFormGroup.valid){
      const credentials = {
        email: this.signInFormGroup.get('email')?.value as string,
        password: this.signInFormGroup.get('password')?.value as string,
      }
      this.authService.signIn(credentials).subscribe((data) => {
        sessionStorage.setItem("enviro-bank_session", JSON.stringify(data));
        this.route.navigateByUrl('customer/home');
      }, (error) => {
        if (error.status === 401){
          this.invalidCredentials = true;
          console.log( 'status code', error.status)
        }
      } )

    }else{
      console.log("Invalid form");
    }
  }

  public requestReset(): void{
    this.route.navigateByUrl('reset-password')
  }
}
