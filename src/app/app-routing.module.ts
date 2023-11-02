import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./shared/components/login/login.component";
import { ResetPasswordComponent } from "./shared/components/reset-password/reset-password.component";
import { UpdatePasswordComponent } from "./shared/components/update-password/update-password.component";
import { AuthorizedRoutes } from "./shared/security/authorized-routs";
import { UpdateUserComponent } from "./shared/components/update-user/update-user.component";
import {ViewProfileComponent} from "./shared/components/view-profile/view-profile.component";
import {ViewAccountsComponent} from "./shared/components/view-accounts/view-accounts.component";
import {ViewTransactionsComponent} from "./shared/components/view-transactions/view-transactions.component";
import {
  ChangePasswordComponent
} from "./shared/components/change-password/change-password.component";

const routes: AuthorizedRoutes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponent,
    title: 'Login page'
  },
  {
    path: 'customer',
    authorizedRoles: ['USER'],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    title: 'Customer Dashboard'
  },
  {
    path: 'admin',
    authorizedRoles: ['ADMIN'],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    title: 'Admin Dashboard'
  },
  {
    path: 'reset-password',
    pathMatch: 'full',
    component: ResetPasswordComponent,
    title: 'Reset Password Page'
  },
  {
    path: 'update-password',
    pathMatch: 'full',
    component: UpdatePasswordComponent,
    title: 'Change Password Page'
  },
  {
    path: 'change-password',
    pathMatch: 'full',
    component: ChangePasswordComponent,
    title: 'Change Password Page'
  },
  {
    path: 'view-account/:id',
    pathMatch: 'full',
    component: ViewAccountsComponent,
    title: 'User Accounts Page'
  },
  {
    path: 'view-profile/:id',
    pathMatch: 'full',
    component: ViewProfileComponent,
    title: 'User Profile Page'
  },
  {
    path: 'admin',
    authorizedRoles: ['ADMIN'],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    title: 'New Client Page'
  },
  {
    path: 'shared',
    permitAll: true,
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    title: 'Transfer Funds Page'
  },
  {
    path: 'update-details/:id',
    pathMatch: 'full',
    component: UpdateUserComponent,
    title: 'Update User Details'
  },
  {
    path: 'view-transactions/:accountNumber/:id',
    pathMatch: 'full',
    component: ViewTransactionsComponent,
    title: 'Account Transactions'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 // providers: [{provide: AuthorizedUserGuard}]
})
export class AppRoutingModule {

  // constructor(router: Router) {
  //   router.resetConfig(addAuthorizationGuards(routes));
  // }
}
