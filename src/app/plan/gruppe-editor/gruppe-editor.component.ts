import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
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

  private _model: DienstPlanGruppe;

  @Input()
  private set model(model: DienstPlanGruppe) {
    this._model = model;
    model.sections.map(section=> {
      let test = section.participants.map(participant => participant.participantUUID).toArray();
      this.participantTmpModel.push(test);
    })

  };

  private get model(): DienstPlanGruppe {
    return this._model;
  }

  @Input()
  private personList: List<Participant> = List<Participant>();

  private participantTmpModel: Array<Array<string>> = [];


  constructor(private planActions: DienstPlanActions) {

  }

  ngOnInit() {
  }


  onChanges(key, value) {
    let updatedModel = this.model.setField(key, value);
    this.planActions.updatePlanDataGroup(updatedModel);
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
    let updatedTeilgruppe = this.model.sections.get(index).setField('participants', List<ParticipantRef>(participantRefArray))
    let updatedModel = this.model.setFieldIn(['sections', index], (old)=> updatedTeilgruppe);


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
