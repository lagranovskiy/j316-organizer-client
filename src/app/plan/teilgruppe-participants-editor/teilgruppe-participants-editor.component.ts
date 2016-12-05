import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from "@angular/core";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {AppStoreService} from "../../services/app-store.service";
import {Participant} from "../../model/Participant";
import {List} from "immutable";
import {ParticipantRef} from "../../model/ParticipantRef";

@Component({
  selector: 'teilgruppe-participants-editor',
  templateUrl: './teilgruppe-participants-editor.component.html',
  styleUrls: ['./teilgruppe-participants-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeilgruppeParticipantsEditorComponent implements OnInit {
  @Input()
  private model: DienstPlanTeilgruppe;

  @Output()
  private participantsChanged: EventEmitter<DienstPlanTeilgruppe> = new EventEmitter<DienstPlanTeilgruppe>();

  private personList: List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  private get participants() {
    if (this.model) {
      return this.model.participants.map(participantRef=>participantRef.participantUUID);
    } else {
      return []
    }

  }

  private set participants(neueParticipants: Array<string>) {
    if (this.model) {
      let currentSelectionString: string = this.model.participants.map(participantRef=>participantRef.participantUUID).reduce((accum, current)=>accum + current, '');
      let newSelectionString: string = neueParticipants.reduce((accum, current)=>accum + current, '');
      if (currentSelectionString != newSelectionString) {
        this.model.participants = neueParticipants.map(participantUUID=>new ParticipantRef({participantUUID}));
        this.participantsChanged.emit(this.model);
      }
    }
  }

  ngOnInit() {
  }

}
