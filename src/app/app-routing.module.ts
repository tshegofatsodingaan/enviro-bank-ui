import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./shared/components/login/login.component";
import { ResetPasswordComponent } from "./shared/components/reset-password/reset-password.component";
import { ChangePasswordComponent } from "./shared/components/change-password/change-password.component";

const routes: Routes = [
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
  // {
  //   path: 'customer/dashboard',
  //   pathMatch: 'full',
  //   component: DashboardComponent,
  //   title: 'Home page'
  // },
  // {
  //   path: 'admin/dashboard',
  //   pathMatch: 'full',
  //   component: DashboardComponent,
  //   title: 'Home page'
  // },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
