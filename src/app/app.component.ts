import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {PersonActions} from "./actions/PersonActions";


@Component({
  selector: 'j316-organizer',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(personActions:PersonActions) {
    personActions.loadPersons();
  }


}
