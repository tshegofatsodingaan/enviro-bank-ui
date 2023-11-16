import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";
import {SharedService} from "../../services/shared.service";
import {Location} from "@angular/common";
import {NgToastService} from "ng-angular-popup";

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
              private location: Location,
              private toast: NgToastService) {
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
      if(result == true){
        this.updateClientDetails();

      }
    })
  }
  promptUser(){
    this.dialogPopUp();
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
          this.toast.success({detail: "Success", summary: "Details updated successfully.", duration: 5000});
          this.location.back();

        }, (error) => {
          if (error.status == 400) {
            this.invalidDetails = true;
          }
          if(error.status == 403){
            console.log("I feel sick!")
          }
          if(error.status == 404){
            console.log("Im not found")
          }
        });


      }
    }
  }

}
