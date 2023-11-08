import { Component } from '@angular/core';
import {Customer} from "../../../models/customer.model";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {

  user: Customer | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.sharedService.getUser(id).subscribe(data => {
        this.user = data;
      });
    }
  }


  public generateInitials(): any {
    if(this.user){
      const nameInitial = this.user.name.charAt(0).toUpperCase();
      const surnameInitial = this.user.surname.charAt(0).toUpperCase();
      return nameInitial + surnameInitial;
    }
  }

}
