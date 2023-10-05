import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Login page'
  },
  {
    path: 'customer/home',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'reset-password',
    pathMatch: 'full',
    component: ResetPasswordComponent,
    title: 'Home page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
