import {Component, OnInit, Input} from "@angular/core";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {DienstPlan} from "../../model/DienstPlan";
import {Participant} from "../../model/Participant";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {List} from "immutable";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;

  @Input()
  private personList: List<Participant> = List<Participant>();


  constructor() {
  }

  getRelatedParticipant(rel: ParticipantRef): any {
    let result = this.personList.filter((person)=>person.uuid == rel.participantUUID);
    if (result.size > 0) {
      return result.first();
    }
    return null;

  }

  toggleVerfuegbarkeit(teilGruppe: DienstPlanTeilgruppe, dayIndex: number) {
    if (teilGruppe.verfuegbarkeit[dayIndex] === undefined) {
      teilGruppe.verfuegbarkeit[dayIndex] = false;
    }
    teilGruppe.verfuegbarkeit[dayIndex] = !teilGruppe.verfuegbarkeit[dayIndex];

  }

  ngOnInit() {
  }

}
