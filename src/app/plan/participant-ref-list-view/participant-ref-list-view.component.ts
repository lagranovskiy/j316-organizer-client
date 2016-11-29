import {Component, OnInit, Input} from "@angular/core";
import {ParticipantRef} from "../../model/ParticipantRef";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {Observable} from "rxjs";
import {Participant} from "../../model/Participant";
import {AppStoreService} from "../../app-store.service";
import {List} from "immutable";

@Component({
  selector: 'participant-ref-list-view',
  templateUrl: './participant-ref-list-view.component.html',
  styleUrls: ['./participant-ref-list-view.component.css']
})
export class ParticipantRefListViewComponent implements OnInit {

  @Input()
  private participants: Array<ParticipantRef>;

  private personList : List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  getRelatedParticipant(rel: ParticipantRef) : Participant{
    let result = this.personList.filter((person)=>person.uuid==rel.participantUUID);
    if(result.size>0){
      return result.first();
    }
    return null;
  }

  ngOnInit() {
  }

}
