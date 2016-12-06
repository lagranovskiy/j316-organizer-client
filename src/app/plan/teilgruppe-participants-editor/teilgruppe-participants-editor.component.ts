import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {AppStoreService} from "../../services/app-store.service";
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

  constructor(private appStoreService: AppStoreService) {
  }

  /**
   * removes ref from model
   * @param ref
   */
  removeParticipantRef(ref: ParticipantRef) {
    this.model.participants.splice(this.model.participants.indexOf(ref), 1);
  }

  /**
   * removes ref from model
   * @param ref
   */
  addParticipantRef(ref: ParticipantRef) {
    this.model.participants.push(ref);
  }



  ngOnInit() {
  }

}
