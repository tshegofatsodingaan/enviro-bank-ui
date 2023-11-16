import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../../shared/services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../../../shared/components/dialog-box/dialog-box.component";
import {Location} from "@angular/common";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  addNewClientFormGroup: FormGroup = new FormGroup({});
  duplicateEmail = false;
  invalidPersonalDetails = false;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private authService: AuthService,
              private dialog: MatDialog,
              private location: Location,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.addNewClientFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  dialogPopUp() {
    const mdConfig = new MatDialogConfig();
    mdConfig.width = '400px';
    mdConfig.data = {
      title: 'Confirm',
      content: 'Click continue to add new client.'
    }
    const dialogReference = this.dialog.open(DialogBoxComponent, mdConfig);
    dialogReference.afterClosed().subscribe(result => {
      if(result == true){
        this.addNewClient();
      }

    })
  }

  promptUser(){
    this.dialogPopUp();
  }

  addNewClient() {
    if (this.addNewClientFormGroup.valid) {
      const userDetails = {
        name: this.addNewClientFormGroup.get('name')?.value as string,
        surname: this.addNewClientFormGroup.get('surname')?.value as string,
        idNumber: this.addNewClientFormGroup.get('idNumber')?.value as string,
        phoneNumber: this.addNewClientFormGroup.get('phoneNumber')?.value as string,
        email: this.addNewClientFormGroup.get('email')?.value as string,
      }
      const enviro_bank_session = this.authService.session


      this.adminService.addNewClient(enviro_bank_session.token, userDetails).subscribe(data => {
        this.duplicateEmail = false;
        this.invalidPersonalDetails = false;
          this.toast.success({detail: "Success!", summary: "New client added successfully.", duration: 5000});
        this.location.back();

      }, (error) => {
        if (error.status == 422) {
          this.duplicateEmail = true;
        }
        if (error.status == 400) {
          this.invalidPersonalDetails = true;
        }
      }

      );


    }
    return
  }
}
