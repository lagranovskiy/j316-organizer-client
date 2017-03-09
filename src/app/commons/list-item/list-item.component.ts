import {Component, OnInit, Input, EventEmitter, Output, ViewChild} from "@angular/core";
import {DisplayableModel} from "../../model/interfaces/DisplayableModel";
import {RemovalDialogComponent} from "../removal-dialog/removal-dialog.component";

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {

  @Input()
  private model: DisplayableModel;

  @Input()
  private clonable: boolean;

  @Output()
  private openClicked: EventEmitter<DisplayableModel> = new EventEmitter<DisplayableModel>();

  @Output()
  private removeClicked: EventEmitter<DisplayableModel> = new EventEmitter<DisplayableModel>();

  @Output()
  private cloneClicked: EventEmitter<DisplayableModel> = new EventEmitter<DisplayableModel>();

  @ViewChild(RemovalDialogComponent)
  private removalDialog: RemovalDialogComponent;

  constructor() {
  }

  sendRemoveEvent() {
    this.removeClicked.emit(this.model);
  }

  sendOpenEvent() {
    this.openClicked.emit(this.model);
  }

  sendCloneEvent() {
    this.cloneClicked.emit(this.model);
  }


  openModal() {
    this.removalDialog.openModal(this.model.getTitle());
  }

  ngOnInit() {
  }
}


