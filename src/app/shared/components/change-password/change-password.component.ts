import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordFormGroup: FormGroup = new FormGroup({});
  uniquePassword: boolean = false;

  constructor(private route: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  public changePassword(){
    if (this.changePasswordFormGroup.valid){
      const passwords = {
        newPassword: this.changePasswordFormGroup.get('newPassword')?.value as string,
        confirmPassword: this.changePasswordFormGroup.get('confirmPassword')?.value as string
      }

      const userToken = this.activatedRoute.snapshot.queryParams['token'];
      if(userToken == undefined){
        const tokenSession = this.authService.session;
        console.log("Token Session: ", tokenSession.token)
        this.authService.changePassword(passwords, tokenSession.token).subscribe((error) => {
          if (error.status === 403){
            this.uniquePassword = true
          }
        })
      } else{

        this.authService.changePassword(passwords, userToken).subscribe((error) => {

          if (error.status === 403){
            this.uniquePassword = true
          }
        })
      }
    }
  }

}
