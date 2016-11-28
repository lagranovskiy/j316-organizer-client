import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {Participant} from "../../model/Participant";
import {List} from "immutable";

@Component({
  selector: 'gruppe-view',
  templateUrl: './gruppe-view.component.html',
  styleUrls: ['./gruppe-view.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class GruppeViewComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  @Input()
  private personList:List<Participant> = List<Participant>();


  @Output()
  private removeClicked: EventEmitter<DienstPlanGruppe> = new EventEmitter<DienstPlanGruppe>();

  private isEditing: boolean = false;

  constructor() {
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  stopEditing() {
    this.isEditing = false;
  }


  sendRemoveEvent() {
    this.removeClicked.emit(this.model);
  }

  ngOnInit() {
  }

}
