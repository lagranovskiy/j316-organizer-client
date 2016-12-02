import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import {RemovalDialogComponent} from "../../commons/removal-dialog/removal-dialog.component";


@Component({
  selector: 'plan-navigation-toolbar',
  templateUrl: './plan-navigation-toolbar.component.html',
  styleUrls: ['./plan-navigation-toolbar.component.css']
})
export class PlanNavigationToolbarComponent implements OnInit {

  @Input()
  isSaveAllowed: boolean;

  @Input()
  isPersistent: boolean;

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  backClicked: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(RemovalDialogComponent)
  private removalDialog: RemovalDialogComponent;


  constructor() {
  }

  ngOnInit() {
  }

  callSaveClicked() {
    this.saveClicked.emit('');
  }

  callRemoveClicked() {
    this.removeClicked.emit('');
  }

  callGoBack() {
    this.backClicked.emit('');
  }



}
