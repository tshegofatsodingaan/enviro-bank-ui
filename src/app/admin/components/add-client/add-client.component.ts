import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  addNewClientFormGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private authService: AuthService,
              private route: Router) {
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


  addNewClient() {
    if(this.addNewClientFormGroup.valid){
      const userDetails = {
        name: this.addNewClientFormGroup.get('name')?.value as string,
        surname: this.addNewClientFormGroup.get('surname')?.value as string,
        idNumber: this.addNewClientFormGroup.get('idNumber')?.value as string,
        phoneNumber: this.addNewClientFormGroup.get('phoneNumber')?.value as string,
        email: this.addNewClientFormGroup.get('email')?.value as string,
      }
      const enviro_bank_session = this.authService.session


      this.adminService.addNewClient(enviro_bank_session.token, userDetails).subscribe(data => {
        console.log(data);
        this.route.navigateByUrl('admin/dashboard');
      });

    }
    return
  }
}
