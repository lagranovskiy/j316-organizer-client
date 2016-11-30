import {Component, OnInit, Input} from "@angular/core";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {DienstPlan} from "../../model/DienstPlan";
import {Participant} from "../../model/Participant";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {List} from "immutable";
import {AppStoreService} from "../../app-store.service";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;


  toggleVerfuegbarkeit(teilGruppe: DienstPlanTeilgruppe, dayIndex: number) {
    if (teilGruppe.verfuegbarkeit[dayIndex] === undefined) {
      teilGruppe.verfuegbarkeit[dayIndex] = false;
    }
    teilGruppe.verfuegbarkeit[dayIndex] = !teilGruppe.verfuegbarkeit[dayIndex];

  }

  ngOnInit() {
  }

}
