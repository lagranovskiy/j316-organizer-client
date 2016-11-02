import {Component} from "@angular/core";
import {Router} from "@angular/router";


@Component({
  selector: 'j316-organizer',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(private router: Router) {

    console.info("Hey im AppComponent initialized")
  }


}
