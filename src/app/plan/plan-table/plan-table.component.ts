import {Component, OnInit, Input} from "@angular/core";
import {DienstPlanCalenderInfo} from "../../model/DienstPlanCalenderInfo";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {isUndefined} from "util";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private planCalenderInfo: DienstPlanCalenderInfo;

  @Input()
  private planGroups: Array<DienstPlanGruppe>;


  constructor(private personService: ParticipantPersistenceService) {
  }

  getRelatedParticipant(rel: ParticipantRef) {
    return this.personService.fetchParticipantById(rel.participantUID);
  }

  completeBesetzungArrays() {
    this.planGroups.map(gruppe=> {

      gruppe.sections.map(teilgruppe=> {
        for (let index = 0; index < this.planCalenderInfo.eventDates.length; index++) {
          if (isUndefined(teilgruppe.besetzung[index]) || teilgruppe.besetzung[index] == null) {
            teilgruppe.besetzung[index] = false;
          }
        }
      })

    });
  }

  ngOnInit() {
  }

}
