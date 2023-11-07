import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import {Customer} from "../../../models/customer.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentials = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router,) {
  }

  user: Customer[] = [];

  ngOnInit(): void {
    sessionStorage.removeItem('enviro-bank_session');
  }

  signInFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public generateInitials(): string {
    const enviroBankSession = this.authService.session

    const nameInitial = enviroBankSession.name.charAt(0).toUpperCase();
    const surnameInitial = enviroBankSession.surname.charAt(0).toUpperCase();
    console.log("initials: ", nameInitial + surnameInitial)
    return nameInitial + surnameInitial;
  }


  public signIn(): void {
    sessionStorage.removeItem('enviro-bank_session')
    if (this.signInFormGroup.valid) {
      this.authService.signIn(this.signInFormGroup.value).subscribe((data) => {
        sessionStorage.setItem("enviro-bank_session", JSON.stringify(data));

        const enviro_bank_session = this.authService.session;
        console.log(enviro_bank_session)

        if (enviro_bank_session.roles[0] == "USER") {
          this.route.navigateByUrl('customer/dashboard');
        } else {
          this.route.navigateByUrl('admin/dashboard');
          this.generateInitials();
        }

      }, (error) => {
        if (error.status === 401) {
          this.invalidCredentials = true;
        }
      })

    }
    return
  }


  public requestReset(): void {
    this.route.navigateByUrl('reset-password')
  }


}
