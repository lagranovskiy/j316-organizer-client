import {Component, OnInit, Input} from "@angular/core";
import {ParticipantRef} from "../../model/ParticipantRef";
import {ParticipantPersistenceService} from "../../participant-persistence.service";

@Component({
  selector: 'participant-ref-list-view',
  templateUrl: './participant-ref-list-view.component.html',
  styleUrls: ['./participant-ref-list-view.component.css']
})
export class ParticipantRefListViewComponent implements OnInit {

  @Input()
  private participants: Array<ParticipantRef>;

  constructor(private personService: ParticipantPersistenceService) {
  }

  getRelatedParticipant(rel: ParticipantRef) {
    return this.personService.fetchParticipantById(rel.participantUUID);
  }

  ngOnInit() {
  }

}
