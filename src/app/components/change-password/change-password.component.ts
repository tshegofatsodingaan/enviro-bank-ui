import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordFormGroup: FormGroup;
  uniquePassword: boolean = false;

  constructor(private route: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {

    this.changePasswordFormGroup = this.formBuilder.group({
      'newPassword': [null, [Validators.required]],
      'confirmPassword': [null, [Validators.required]]
    })
  }


  public changePassword(){
    if (this.changePasswordFormGroup.valid){
      const passwords = {
        newPassword: this.changePasswordFormGroup.get('newPassword')?.value as string,
        confirmPassword: this.changePasswordFormGroup.get('confirmPassword')?.value as string
      }

      const userToken = this.activatedRoute.snapshot.queryParams['token'];
      this.authService.changePassword(passwords, userToken).subscribe(data =>{
        console.log("print this")
        this.route.navigateByUrl('');
      }, (error) => {
        if (error.status === 403){
          this.uniquePassword = true
        }
      })
    }
    // this.route.navigateByUrl('')
  }

}
