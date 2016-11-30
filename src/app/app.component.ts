import {Component} from "@angular/core";
import {AppStoreService} from "./services/app-store.service";
import {AuthService} from "./services/auth-service.service";


@Component({
  selector: 'j316-organizer',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(private appStore: AppStoreService, private auth: AuthService) {
    if(!auth.authenticated()){
      appStore.loadData();
    }
    console.info("Hey im J316 Organizer and was initialized")
  }


}
