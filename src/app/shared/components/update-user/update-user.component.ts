import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
  }

  updateClientDetails(){
    const enviro_bank_session = this.authService.session;

    this.authService.updateUser(enviro_bank_session.id).subscribe(data => {
      console.log(data);
    })
  }

}
