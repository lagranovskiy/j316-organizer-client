import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth-service.service";

@Injectable()
export class AuthGuardService {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
        return true;
    } else {
      // Save URL to redirect to after login and fetching profile to get roles
      this.router.navigate(['']);
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      return false;
    }
  }

}
