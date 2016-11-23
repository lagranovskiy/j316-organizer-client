import {Component, OnInit, Input} from "@angular/core";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {DienstPlan} from "../../model/DienstPlan";
import {Participant} from "../../model/Participant";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;

  private personList: Array<Participant> = [];


  constructor(private personService: ParticipantPersistenceService) {
    personService.fetchParticipants().subscribe(list => this.personList = list);
  }

  getRelatedParticipant(rel: ParticipantRef): any {

    let result = this.personList.filter((person)=>person.uuid == rel.participantUUID);
    if (result.length > 0) {
      return result[0];
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
