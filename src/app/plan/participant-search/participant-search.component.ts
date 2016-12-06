import {Component, OnInit, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MaterializeAction} from "angular2-materialize";
import {AppStoreService} from "../../services/app-store.service";
import {Participant} from "../../model/Participant";
import {List} from "immutable";
import {ParticipantRef} from "../../model/ParticipantRef";

@Component({
  selector: 'participant-search',
  templateUrl: './participant-search.component.html',
  styleUrls: ['./participant-search.component.css']
})
export class ParticipantSearchComponent implements OnInit {

  @Input()
  private selectedParticipantRefs: Array<ParticipantRef>;

  @Output()
  private participantRemoved: EventEmitter<ParticipantRef> = new EventEmitter<ParticipantRef>();

  @Output()
  private participantAdded: EventEmitter<ParticipantRef> = new EventEmitter<ParticipantRef>();

  @ViewChild('items') filteredItems;

  private searchString: string;
  private modalActions = new EventEmitter<string|MaterializeAction>();

  private personList: List<Participant> = List<Participant>();
  private filteredPersonList: List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  ngOnInit() {
    this.searchString = '';
  }

  private getRef(participant: Participant) {
    return this.selectedParticipantRefs.filter(ref=>ref.participantUUID == participant.uuid)
  }

  private participantModalOpen() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }


  private toggleParticipant(participant: Participant) {
    let refs = this.getRef(participant);
    if (refs.length == 0) {
      this.participantAdded.emit(new ParticipantRef({participantUUID: participant.uuid}));
    } else {
      this.participantRemoved.emit(refs[0]);
    }
  }

}
