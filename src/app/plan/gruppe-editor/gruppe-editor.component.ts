import {Component, OnInit} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {Input} from "@angular/core/src/metadata/directives";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";

@Component({
  selector: 'gruppe-editor',
  templateUrl: './gruppe-editor.component.html',
  styleUrls: ['./gruppe-editor.component.css']
})
export class GruppeEditorComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  @Input()
  private showMaps: boolean;

  addTeilgruppe() {
    this.model.sections.push(new DienstPlanTeilgruppe());
  }

  removeTeilgruppe(teilgruppe: DienstPlanTeilgruppe) {
    this.model.sections.splice(this.model.sections.indexOf(teilgruppe), 1);
  }

  upTeilgruppe(teilgruppe: DienstPlanTeilgruppe){
    let indexOfGroup = this.model.sections.indexOf(teilgruppe);
    this.model.sections.splice(this.model.sections.indexOf(teilgruppe), 1);
    this.model.sections.splice(indexOfGroup-1,0,teilgruppe)
  }

  ngOnInit() {
  }


}
