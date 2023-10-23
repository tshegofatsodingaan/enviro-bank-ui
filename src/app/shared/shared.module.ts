import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import {RouterLink} from "@angular/router";
import { ViewTransactionsComponent } from './components/view-transactions/view-transactions.component';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    UpdateUserComponent,
    ViewProfileComponent,
    ViewTransactionsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }
