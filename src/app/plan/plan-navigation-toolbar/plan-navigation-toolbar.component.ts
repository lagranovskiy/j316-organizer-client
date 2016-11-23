import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {NotificationControlService} from "../../notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";


@Component({
  selector: 'plan-navigation-toolbar',
  templateUrl: './plan-navigation-toolbar.component.html',
  styleUrls: ['./plan-navigation-toolbar.component.css']
})
export class PlanNavigationToolbarComponent implements OnInit {

  @Input()
  planUUID: string;

  @Input()
  isSaveAllowed: Function;

  @Input()
  isPersistent: Function;

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  backClicked: EventEmitter<any> = new EventEmitter<any>();


  sentReport: Array<NotificationEntry> =[];


  constructor(private notificationService: NotificationControlService) {
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

  startPlanNotifications() {
    this.notificationService.startPlanNotification(this.planUUID).subscribe((data)=> {
      this.sentReport = data;
      // Display Data
    });
  }
}
