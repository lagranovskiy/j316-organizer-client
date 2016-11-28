import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {Input} from "@angular/core/src/metadata/directives";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {Participant} from "../../model/Participant";
import {List} from "immutable";
import {ParticipantRef} from "../../model/ParticipantRef";
import {DienstPlanActions} from "../../actions/DienstPlanActions";

@Component({
  selector: 'gruppe-editor',
  templateUrl: './gruppe-editor.component.html',
  styleUrls: ['./gruppe-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GruppeEditorComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  @Input()
  private personList: List<Participant> = List<Participant>();


  constructor(private planActions: DienstPlanActions){

  }

  ngOnInit() {
  }


  onChanges(key, value) {
    let updatedModel = this.model.setField(key, value);
    this.planActions.updatePlanDataGroup(updatedModel);
  }

  /**
   * Convert participants able to bind them on the view
   * @param participants
   * @return {any}
   */
  private extractParticipants(participants: Array<ParticipantRef>): Array<string> {
    if (participants) {
      let result: Array<string> = participants.map(participantRef=>participantRef.participantUUID)
      return result;
    }
    return [];
  }


  /**
   * Notify Parent about change in Besetzung
   *
   * @param teilgruppe
   * @param data
   */
  besetzungChanged(teilgruppe: DienstPlanTeilgruppe, data) {
    let participantRefArray = [];
    data.forEach(participantUUID=>participantRefArray.push(new ParticipantRef({participantUUID})));

    let index = this.model.sections.findIndex(sectionTeilgruppe => sectionTeilgruppe.uuid === teilgruppe.uuid);
    let updatedModel = this.model.setFieldIn(['sections', index, 'participants'], (old)=> participantRefArray);

    this.planActions.updatePlanDataGroup(updatedModel);
  }

  /**
   * Notify about new Teilgruppe added
   */
  addTeilgruppe() {
    let updatedModel = this.model.setFieldIn(['sections'], (current) => current.push(new DienstPlanTeilgruppe()));
    this.planActions.updatePlanDataGroup(updatedModel);
  }

  /**
   * Notify a teilgruppe is removed
   * @param teilgruppe
   */
  removeTeilgruppe(teilgruppe: DienstPlanTeilgruppe) {
    this.model.sections.splice(this.model.sections.indexOf(teilgruppe), 1);

    let index = this.model.sections.findIndex(section=>section.uuid === teilgruppe.uuid);
    let updatedModel = this.model.setFieldIn(['sections'], (currentSections: List<DienstPlanTeilgruppe>) => currentSections.remove(index));
    this.planActions.updatePlanDataGroup(updatedModel);
  }


}
