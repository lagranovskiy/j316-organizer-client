import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {NotificationControlService} from "../../notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";


@Component({
  selector: 'plan-navigation-toolbar',
  templateUrl: './plan-navigation-toolbar.component.html',
  styleUrls: ['./plan-navigation-toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
