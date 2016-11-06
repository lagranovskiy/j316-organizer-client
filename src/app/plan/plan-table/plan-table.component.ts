import {Component, OnInit, Input} from "@angular/core";
import {DienstPlanCalenderInfo} from "../../model/DienstPlanCalenderInfo";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {isUndefined} from "util";

import * as moment from "moment";
import {DienstPlan} from "../../model/DienstPlan";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;

  private eventDates: Array<string> = [];


  constructor(private personService: ParticipantPersistenceService) {
  }

  getRelatedParticipant(rel: ParticipantRef) {
    return this.personService.fetchParticipantById(rel.participantUID);
  }


  generateEventDates() {
    this.eventDates = [];
    let planIterator = moment(this.plan.planStart, 'DD.MM.YYYY');

    while (planIterator.isBefore(moment(this.plan.planEnd, 'DD.MM.YYYY'))) {
      this.eventDates.push(planIterator.format('DD.MM'));
      planIterator.add(this.plan.eventRecurringDays, 'days');
    }

  }

  completeBesetzungArrays() {
    this.plan.groupList.map(gruppe=> {
      gruppe.sections.map(teilgruppe=> {
        for (let index = 0; index < this.eventDates.length; index++) {
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
