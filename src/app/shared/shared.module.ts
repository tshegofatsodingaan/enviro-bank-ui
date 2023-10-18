import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    UpdateClientComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }
