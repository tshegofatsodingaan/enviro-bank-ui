import {Route} from '@angular/router';

export interface AuthorizedRoute extends Route {
  authorizedRoles?: any[];
  permitAll?: boolean;
  children?: AuthorizedRoutes;
}

export declare type AuthorizedRoutes = AuthorizedRoute[];
