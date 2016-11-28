import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {PersonActions} from "./actions/PersonActions";
import {DienstPlanActions} from "./actions/DienstPlanActions";


@Component({
  selector: 'j316-organizer',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(personActions:PersonActions, dienstPlanActions: DienstPlanActions) {
    personActions.loadPersons();
    dienstPlanActions.loadDienstPlans()
  }


}
