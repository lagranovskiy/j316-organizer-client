import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {AppStoreService} from "../../app-store.service";
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

  private get participants() {
    if (this.model) {
      return this.model.participants.map(participantRef=>participantRef.participantUUID);
    } else {
      return []
    }

  }

  private set participants(neueParticipants: Array<string>) {
    if (this.model) {
      this.model.participants = neueParticipants.map(participantUUID=>new ParticipantRef({participantUUID}));
    }
  }

  private personList: List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  ngOnInit() {
  }

}
