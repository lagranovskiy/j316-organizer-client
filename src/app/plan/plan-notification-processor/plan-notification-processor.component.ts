import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {NotificationControlService} from "../../notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";
import {DienstPlan} from "../../model/DienstPlan";

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

  cancelReport: any = {};
  sentReport: Array<NotificationEntry> = [];

  error = null;

  constructor(private notificationService: NotificationControlService) {
  }


  startPlanNotifications() {
    this.sentReport = [];
    this.error = null;
    this.notificationService.startPlanNotification(this.plan.uuid)
      .subscribe((data)=> {
          this.sentReport = data;
          if (data.length > 0 && data[0].success) {
            this.notificationsActive = true;
            this.notificationsUpdated.emit('updated')
          }

        },
        (error)=> {
          this.error = error;
        });
  }

  removePlanNotifications() {
    this.error = null;
    this.cancelReport = {};

    this.notificationService.cancelGroupNotifications(this.plan.uuid)
      .subscribe((data)=> {
          this.cancelReport = data;
          if (data.n >= 0) {
            this.notificationsActive = false;
            this.notificationsUpdated.emit('updated')
          } else {
            this.error = data.errorMessage;
          }

        },
        (error)=> {
          this.error = error;
        });
  }


  ngOnInit() {
  }

}
