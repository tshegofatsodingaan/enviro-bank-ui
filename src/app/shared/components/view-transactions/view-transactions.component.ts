import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../models/customer.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit{

  customer: Customer | undefined;
  initials = '';

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.authService.getUser(id).subscribe( data => {
        this.customer = data
        const name = this.customer.name.charAt(0).toUpperCase();
        const surname = this.customer.surname.charAt(0).toUpperCase();
        this.initials =  name + surname
      });
    }
  }



}
