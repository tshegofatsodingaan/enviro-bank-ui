import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isSubMenuOpen = false;
  enviroBankSession = this.authService.session
  id = this.enviroBankSession.id;

  toggleMenu(){
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }

  constructor(private authService: AuthService) {
  }


  public generateInitials(): string {
    const nameInitial = this.enviroBankSession.name.charAt(0).toUpperCase();
    const surnameInitial = this.enviroBankSession.surname.charAt(0).toUpperCase();
    return nameInitial + surnameInitial;
  }

  public signOut(){
    this.authService.redirectToLogin();
  }

  public changePassword(){
    this.authService.redirectToChangePassword();
  }

  public viewProfile(){
    this.authService.viewProfile();
  }

}
