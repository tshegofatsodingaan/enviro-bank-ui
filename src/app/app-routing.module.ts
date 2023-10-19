import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./shared/components/login/login.component";
import { ResetPasswordComponent } from "./shared/components/reset-password/reset-password.component";
import { ChangePasswordComponent } from "./shared/components/change-password/change-password.component";
import { AuthorizedRoutes } from "./shared/security/authorized-routs";
import { UpdateUserComponent } from "./shared/components/update-user/update-user.component";
import {ViewProfileComponent} from "./shared/components/view-profile/view-profile.component";

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
    path: 'change-password',
    pathMatch: 'full',
    component: ChangePasswordComponent,
    title: 'Change Password Page'
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
    path: 'customer',
    authorizedRoles: ['USER'],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    title: 'Transfer Funds Page'
  },
  {
    path: 'update-details/:id',
    pathMatch: 'full',
    component: UpdateUserComponent,
    title: 'Update User Details'
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
