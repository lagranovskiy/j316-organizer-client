import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {Input} from "@angular/core/src/metadata/directives";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {Participant} from "../../model/Participant";


@Component({
  selector: 'gruppe-editor',
  templateUrl: './gruppe-editor.component.html',
  styleUrls: ['./gruppe-editor.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class GruppeEditorComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  @Input()
  private personList:Array<Participant> =[];

  addTeilgruppe() {
    this.model.sections.push(new DienstPlanTeilgruppe());
  }

  removeTeilgruppe(teilgruppe: DienstPlanTeilgruppe) {
    this.model.sections.splice(this.model.sections.indexOf(teilgruppe), 1);
  }

  ngOnInit() {
  }


}
