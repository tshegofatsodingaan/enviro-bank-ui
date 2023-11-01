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
import {RouterLink, RouterModule} from "@angular/router";
import { ViewTransactionsComponent } from './components/view-transactions/view-transactions.component';
import {AuthorizedRoute} from "./security/authorized-routs";
import {TransferComponent} from "./components/transfer/transfer.component";
import {customerRoutes} from "../customer/customer.module";
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { AccountCardsComponent } from './components/account-cards/account-cards.component';
import { ChangePasswordBeforeLoginComponent } from './components/change-password-before-login/change-password-before-login.component';


export const sharedRoutes: AuthorizedRoute[] = [
  {
    path: 'transfer-funds',
    component: TransferComponent
  }

];

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    NavbarComponent,
    UpdateUserComponent,
    ViewProfileComponent,
    ViewTransactionsComponent,
    TransferComponent,
    DialogBoxComponent,
    AccountCardsComponent,
    ChangePasswordBeforeLoginComponent
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
        AccountCardsComponent
    ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }
