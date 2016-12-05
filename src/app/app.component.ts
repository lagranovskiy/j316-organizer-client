import {Component} from "@angular/core";
import {AppStoreService} from "./services/app-store.service";
import {AuthService} from "./services/auth-service.service";
import {Router} from "@angular/router";
import {environment} from "../environments";

@Component({
  selector: 'j316-organizer',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private appStore: AppStoreService, private auth: AuthService, private router: Router) {
    console.info("Hey im J316 Organizer and was initialized")
  }

  processLogout() {
    this.router.navigate(['/']);
    this.auth.logout();
  }

}
