import {Routes} from '@angular/router';
import {AuthorizedUserGuard} from './activate-if-user-authorized.guard';
import {inject} from "@angular/core";

export function addAuthorizationGuards(routes: Routes): Routes {
  addAuthorizationGuardsToRoutesHavingPathsAndComponents(routes);
  return routes;

  function addAuthorizationGuardsToRoutesHavingPathsAndComponents(routesToGuard: Routes) {
    for (const route of routesToGuard) {
      if (route.path) {
        route.canActivate = route.canActivate || [];
        route.canActivate.push(inject(AuthorizedUserGuard).canActivate);
      }
      if (route.children) {
        addAuthorizationGuardsToRoutesHavingPathsAndComponents(route.children);
      }
    }
  }
}
