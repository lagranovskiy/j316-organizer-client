import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AppStoreService} from "./app-store.service";


@Component({
  selector: 'j316-organizer',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(private appStore: AppStoreService) {
    appStore.loadData();
    console.info("Hey im AppComponent initialized")
  }


}
