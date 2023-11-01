import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordFormGroup: FormGroup = new FormGroup({});
  uniquePassword: boolean = false;
  durationInSeconds = 2;
  snackBarMessage = 'Password updated successfully!'

  constructor(private route: Router, private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  public displaySnackBar(){
    this.snackBar.open(this.snackBarMessage, 'Close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'success-snackbar'
    })
  }

  public changePassword(){
    if (this.changePasswordFormGroup.valid){
      const passwords = {
        newPassword: this.changePasswordFormGroup.get('newPassword')?.value as string,
        confirmPassword: this.changePasswordFormGroup.get('confirmPassword')?.value as string
      }

      const tokenSession = this.authService.session;
      this.authService.changePassword(passwords, tokenSession.token).subscribe((error) => {
        this.displaySnackBar();
        if (error.status === 403){
          this.uniquePassword = true
        }
      })
    }
  }

}
