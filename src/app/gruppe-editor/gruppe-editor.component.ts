import {Component, OnInit} from "@angular/core";
import {DienstPlanGruppe} from "../model/DienstPlanGruppe";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'gruppe-editor',
  templateUrl: './gruppe-editor.component.html',
  styleUrls: ['./gruppe-editor.component.css']
})
export class GruppeEditorComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  private sidenavParams = [];


  constructor() {
  }

  public openEditor(gruppe: DienstPlanGruppe) {
    this.model = gruppe;
  }

  ngOnInit() {
  }

}
