import {Component, OnInit, EventEmitter, Input, Output} from "@angular/core";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'removal-dialog',
  templateUrl: './removal-dialog.component.html',
  styleUrls: ['./removal-dialog.component.css']
})
export class RemovalDialogComponent implements OnInit {

  private modalActions = new EventEmitter<string|MaterializeAction>();

  @Input()
  private removalIdentification: string;

  @Output()
  public removeAccepted: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }


  private accept() {
    this.removeAccepted.emit('');
  }

  /**
   * Opens dialog with given or bound text
   * @param removalText
   */
  public openModal(removalIdentification = null) {
    if (removalIdentification) {
      this.removalIdentification = removalIdentification;
    }
    this.modalActions.emit({action: "modal", params: ['open']});
  }
}
