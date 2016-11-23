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

  @Output()
  private notificationsUpdated: EventEmitter<string> = new EventEmitter<string>();

  sentReport: Array<NotificationEntry> = [];

  error = null;

  constructor(private notificationService: NotificationControlService) {
  }


  startPlanNotifications() {
    this.notificationService.startPlanNotification(this.plan.uuid)
      .subscribe((data)=> {
          this.sentReport = data;

          this.notificationsUpdated.emit('updated')
        },
        (error)=> {
          this.error = error;
        });
  }

  ngOnInit() {
  }

}
