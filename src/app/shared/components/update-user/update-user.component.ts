import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{


  updateUserFormGroup: FormGroup = new FormGroup<any>({})

  durationInSeconds = 2;

  snackBarMessage = 'User updated successfully!'

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private route: Router) {
  }


  ngOnInit(): void {
    this.updateUserFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      idNumber: ['', [Validators.required]]
    })
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.authService.getUser(id).subscribe(data => {
          this.updateUserFormGroup.patchValue(data);
      });
    }
  }

  updateClientDetails(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.updateUserFormGroup.valid){
      const userDetails = {
        name: this.updateUserFormGroup.get('name')?.value as string,
        surname: this.updateUserFormGroup.get('surname')?.value as string,
        email: this.updateUserFormGroup.get('email')?.value as string,
        phoneNumber: this.updateUserFormGroup.get('phoneNumber')?.value as string,
        idNumber: this.updateUserFormGroup.get('idNumber')?.value as string
      }
      if(id){
        this.authService.updateUser(id, userDetails).subscribe(data => {
          this.snackBar.open(this.snackBarMessage, 'Close', {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'success-snackbar'
          });
          console.log(data);
          this.route.navigateByUrl('admin/dashboard')
        })
      }

    }


  }

}
