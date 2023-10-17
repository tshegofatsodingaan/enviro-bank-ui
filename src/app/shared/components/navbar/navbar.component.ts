import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isSubMenuOpen = false;

  toggleMenu(){
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }

  constructor(private authService: AuthService) {
  }


  public generateInitials(): string {
    const enviroBankSession = this.authService.session

    const nameInitial = enviroBankSession.name.charAt(0).toUpperCase();
    const surnameInitial = enviroBankSession.surname.charAt(0).toUpperCase();
    console.log("initials: ", nameInitial + surnameInitial)
    return nameInitial + surnameInitial;
  }

}
