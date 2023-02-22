import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateViaAuthGuard implements CanActivate, CanLoad {
  previousUrl: string = '';
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  checkLoggedIn(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authorizationService.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (route?.data?.['permissionIdentifier']) {
      return this.checkLoggedIn();
    } else {
      return this.checkLoggedIn();
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (next?.data?.['permissionIdentifier']) {
      return this.checkLoggedIn();
    } else {
      return this.checkLoggedIn();
    }
  }
}
