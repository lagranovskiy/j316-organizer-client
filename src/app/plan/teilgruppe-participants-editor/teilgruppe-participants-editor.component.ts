import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from "@angular/core";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {AppStoreService} from "../../app-store.service";
import {Participant} from "../../model/Participant";
import {List} from "immutable";
import {ParticipantRef} from "../../model/ParticipantRef";

@Component({
  selector: 'teilgruppe-participants-editor',
  templateUrl: './teilgruppe-participants-editor.component.html',
  styleUrls: ['./teilgruppe-participants-editor.component.css']
})
export class TeilgruppeParticipantsEditorComponent implements OnInit {

  private _model: DienstPlanTeilgruppe;

  @Input()
  private set model(model: DienstPlanTeilgruppe){
    this._model=model;
    this.participantArray = model.participants.map(participantRef=>participantRef.participantUUID);
  }

  @Output()
  private participantsChanged: EventEmitter<DienstPlanTeilgruppe> = new EventEmitter<DienstPlanTeilgruppe>();

  private participantArray=[];


  besetzungChanged(neueParticipants:Array<string>){
    if(neueParticipants){
      this._model.participants = neueParticipants.map(participantUUID=>new ParticipantRef({participantUUID}));
      this.participantsChanged.emit(this._model);
    }
  }

  private personList: List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  ngOnInit() {
  }

}
