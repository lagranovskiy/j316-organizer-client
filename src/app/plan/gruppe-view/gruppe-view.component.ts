import {Component, OnInit, Input, EventEmitter, Output, ViewChild} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {RemovalDialogComponent} from "../../commons/removal-dialog/removal-dialog.component";

@Component({
  selector: 'gruppe-view',
  templateUrl: './gruppe-view.component.html',
  styleUrls: ['./gruppe-view.component.css']
})
export class GruppeViewComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  @Output()
  private removeClicked: EventEmitter<DienstPlanGruppe> = new EventEmitter<DienstPlanGruppe>();

  @Output()
  private upButtonClicked: EventEmitter<DienstPlanGruppe> = new EventEmitter<DienstPlanGruppe>();

  @Input()
  private showMaps: boolean;

  @ViewChild(RemovalDialogComponent)
  private removalDialog: RemovalDialogComponent;





  private isEditing: boolean = false;

  constructor() {
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  stopEditing() {
    this.isEditing = false;
  }


  sendUpEvent() {
    this.upButtonClicked.emit(this.model);
  }



  sendRemoveEvent() {
    this.removeClicked.emit(this.model);
  }

  ngOnInit() {
  }

}
