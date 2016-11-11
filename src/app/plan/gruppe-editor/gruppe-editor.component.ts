import {Component, OnInit} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {Input} from "@angular/core/src/metadata/directives";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {Participant} from "../../model/Participant";


@Component({
  selector: 'gruppe-editor',
  templateUrl: './gruppe-editor.component.html',
  styleUrls: ['./gruppe-editor.component.css']
})
export class GruppeEditorComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  private personList: Array<Participant> = [];

  constructor(private personService: ParticipantPersistenceService) {
    this.personService.fetchParticipants().subscribe(personList => this.personList = personList);
  }

  addTeilgruppe() {
    this.model.sections.push(new DienstPlanTeilgruppe());
  }

  removeTeilgruppe(teilgruppe: DienstPlanTeilgruppe) {
    this.model.sections.splice(this.model.sections.indexOf(teilgruppe), 1);
  }

  ngOnInit() {
  }


}
