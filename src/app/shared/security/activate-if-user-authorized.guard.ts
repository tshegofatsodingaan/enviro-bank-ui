import {Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AuthorizedRoute} from "./authorized-routs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthorizedUserGuard {
  canActivate(route: any, state: RouterStateSnapshot): boolean {

    const permitAll: keyof AuthorizedRoute = 'permitAll';
    const authorizedRoles: keyof AuthorizedRoute = 'authorizedRoles';

    const router = inject(Router);
    const authService = inject(AuthService);

    if (route && route.routeConfig && route.routeConfig[permitAll]) {
      return true;
    }

    const enviro_bank_session = authService.session;

    if (enviro_bank_session && route && route.routeConfig && route.routeConfig[authorizedRoles]) {
      const routeAuthorizedRoles: string[] = route.routeConfig[authorizedRoles];

      for (const routeAuthorizedRole of routeAuthorizedRoles) {
        if (enviro_bank_session.role.includes(routeAuthorizedRole)) {
          return true;
        }
      }
      //authService.signOut();
      return false;
    } else {
      //authService.signOut();
      return false;
    }
  }
}
