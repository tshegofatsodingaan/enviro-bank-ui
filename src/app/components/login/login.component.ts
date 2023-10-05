import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  signInFormGroup: FormGroup;

  invalidCredentials: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signInFormGroup = this.formBuilder.group({
      email: ['tshego@gmail.com', [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  // ngOnInit(): void {
  //   this.signInFormGroup = this.formBuilder.group({
  //     email: [null, [Validators.required]],
  //     password: [null, [Validators.required]]
  //   })
  // }

  public signIn(): void {
    if(this.signInFormGroup.valid){
      const credentials = {
        email: this.signInFormGroup.get('email')?.value as string,
        password: this.signInFormGroup.get('password')?.value as string,
      }
      this.authService.signIn(credentials).subscribe((data) => {
        sessionStorage.setItem("enviro-bank_session", JSON.stringify(data));
      }, (error) => {
        if (error.status === 403){
          this.invalidCredentials = true;
        }
      } )
    }else{
      console.log("Invalid form")
    }
  }
}