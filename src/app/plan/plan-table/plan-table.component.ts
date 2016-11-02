import {Component, OnInit, Input} from "@angular/core";
import {DienstPlanCalenderInfo} from "../../model/DienstPlanCalenderInfo";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";

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

  ngOnInit() {
  }

}
