import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {NotificationControlService} from "../../services/notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";
import {DienstPlan} from "../../model/DienstPlan";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'plan-notification-processor',
  templateUrl: './plan-notification-processor.component.html',
  styleUrls: ['./plan-notification-processor.component.css']
})
export class PlanNotificationProcessorComponent implements OnInit {

  @Input()
  private plan: DienstPlan;

  @Input()
  private notificationsActive: boolean = false;

  @Output()
  private notificationsUpdated: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  private notificationActive: EventEmitter<boolean> = new EventEmitter<boolean>();


  private reportModalActions = new EventEmitter<string|MaterializeAction>();
  private removalModalActions = new EventEmitter<string|MaterializeAction>();

  cancelReport: any = {};
  sentReport: Array<NotificationEntry> = [];

  error = null;

  constructor(private notificationService: NotificationControlService) {
  }

  showReportModal() {
    this.reportModalActions.emit({action: "modal", params: ['open']});
  }

  showRemovalModal() {
    this.removalModalActions.emit({action: "modal", params: ['open']});
  }


  startPlanNotifications() {
    this.sentReport = [];
    this.error = null;
    this.notificationService.startPlanNotification(this.plan.uuid)
      .subscribe((data)=> {
          this.sentReport = data;
          if (data.length > 0 && data[0].success) {
            this.notificationsActive = true;
            this.notificationsUpdated.emit('updated');
            this.notificationActive.emit(true);
          }
          this.showReportModal();

        },
        (error)=> {
          this.error = error;
        });
  }


  countSuccessError(notifications: Array<NotificationEntry>) {
    let retVal = {success: 0, error: 0};
    retVal.success = notifications.filter(notification=>notification.success).length;
    retVal.error = notifications.filter(notification=>!notification.success).length;
    return retVal;
  }

  removePlanNotifications() {
    this.error = null;
    this.cancelReport = {};


    this.notificationService.cancelGroupNotifications(this.plan.uuid)
      .subscribe((data)=> {
          this.cancelReport = data;
          if (data.n >= 0) {
            this.notificationsActive = false;
            this.notificationsUpdated.emit('updated');
            this.notificationActive.emit(false);
          } else {
            this.error = data.errorMessage;
          }

          this.showRemovalModal();
        },
        (error)=> {
          this.error = error;
        });
  }


  ngOnInit() {
  }

}
