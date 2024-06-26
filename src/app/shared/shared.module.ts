import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { UpdatePasswordComponent } from "./components/update-password/update-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import {RouterLink, RouterModule} from "@angular/router";
import { ViewTransactionsComponent } from './components/view-transactions/view-transactions.component';
import {AuthorizedRoute} from "./security/authorized-routs";
import {TransferComponent} from "./components/transfer/transfer.component";
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { AccountCardsComponent } from './components/account-cards/account-cards.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { BackButtonComponent } from './components/back-button/back-button.component';


export const sharedRoutes: AuthorizedRoute[] = [
  {
    path: 'transfer-funds',
    component: TransferComponent
  }

];

@NgModule({
  declarations: [
    LoginComponent,
    UpdatePasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    UpdateUserComponent,
    ViewProfileComponent,
    ViewTransactionsComponent,
    TransferComponent,
    DialogBoxComponent,
    AccountCardsComponent,
    ChangePasswordComponent,
    PersonalDetailsComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(sharedRoutes),
    MatSnackBarModule,
    RouterLink
  ],
  exports: [
    NavbarComponent,
    AccountCardsComponent,
    PersonalDetailsComponent,
    BackButtonComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }
