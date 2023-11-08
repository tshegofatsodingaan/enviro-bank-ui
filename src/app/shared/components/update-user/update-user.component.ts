import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  updateUserFormGroup: FormGroup = new FormGroup<any>({})

  invalidDetails = false;

  constructor(private sharedService: SharedService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
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

    if (id) {
      this.sharedService.getUser(id).subscribe(data => {
        this.updateUserFormGroup.patchValue(data);
      });
    }
  }

  dialogPopUp() {
    const mdConfig = new MatDialogConfig();
    mdConfig.width = '400px';
    mdConfig.data = {
      title: 'Confirm',
      content: 'Are you sure you want to proceed with this update?'
    }
    const dialogRef = this.dialog.open(DialogBoxComponent, mdConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.route.navigateByUrl('')
    })
  }

  updateClientDetails() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.updateUserFormGroup.valid) {
      const userDetails = {
        name: this.updateUserFormGroup.get('name')?.value as string,
        surname: this.updateUserFormGroup.get('surname')?.value as string,
        email: this.updateUserFormGroup.get('email')?.value as string,
        phoneNumber: this.updateUserFormGroup.get('phoneNumber')?.value as string,
        idNumber: this.updateUserFormGroup.get('idNumber')?.value as string
      }

      if (id) {
        this.sharedService.updateUser(id, userDetails).subscribe((data) => {
          this.invalidDetails = false;
          this.dialogPopUp();
        }, (error) => {
          if (error.status == 400) {
            this.invalidDetails = true;
          }
        });


      }
    }
  }

}
