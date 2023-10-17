import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./shared/components/login/login.component";
import { ResetPasswordComponent } from "./shared/components/reset-password/reset-password.component";
import { ChangePasswordComponent } from "./shared/components/change-password/change-password.component";
import { CustomerDashboardComponent } from "./customer/components/customer-dashboard/customer-dashboard.component";
import { AdminDashboardComponent } from "./admin/components/admin-dashboard/admin-dashboard.component";
import { AuthorizedRoutes } from "./shared/security/authorized-routs";
import { AddClientComponent } from "./admin/components/add-client/add-client.component";
import { TransferComponent } from "./customer/components/transfer/transfer.component";

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
    title: 'Admin dashboard'
  },
  {
    path: 'reset-password',
    pathMatch: 'full',
    component: ResetPasswordComponent,
    title: 'Reset password page'
  },
  {
    path: 'change-password',
    pathMatch: 'full',
    component: ChangePasswordComponent,
    title: 'Change password page'
  },
  {
    path: 'admin',
    authorizedRoles: ['ADMIN'],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    title: 'New client page'
  },
  {
    path: 'customer',
    authorizedRoles: ['USER'],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    title: 'Transfer funds page'
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
