import {Component, OnInit, Input} from "@angular/core";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {DienstPlan} from "../../model/DienstPlan";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;


  constructor(private personService: ParticipantPersistenceService) {
  }

  getRelatedParticipant(rel: ParticipantRef) {
    return this.personService.fetchParticipantById(rel.participantUUID);
  }



  ngOnInit() {
  }

}
