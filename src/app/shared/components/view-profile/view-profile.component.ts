import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Customer} from "../../../models/customer.model";
import {Account} from "../../../models/account.model";
import {SharedService} from "../../services/shared.service";


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  user: Customer | undefined;
  accounts: Account[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.sharedService.getUser(id).subscribe(data => {
        this.user = data;
      });
      this.gatherUserAccounts();
    }

  }

  public gatherUserAccounts(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.sharedService.getAllAccounts(id, {size: 3, page: 0}).subscribe(data => {
        this.accounts = data;
        console.log(this.accounts);
      })
    }


  }

  public generateInitials(): any {
    if(this.user){
      const nameInitial = this.user.name.charAt(0).toUpperCase();
      const surnameInitial = this.user.surname.charAt(0).toUpperCase();
      return nameInitial + surnameInitial;
    }
  }

  transferFunds() {
    this.route.navigateByUrl('customer/transfer-funds');
  }
}
