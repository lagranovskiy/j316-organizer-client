import {Component, OnInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {NotificationControlService} from "../../notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";

@Component({
  selector: 'app-plan-notification-view',
  templateUrl: './plan-notification-view.component.html',
  styleUrls: ['./plan-notification-view.component.css']
})
export class PlanNotificationViewComponent implements OnInit {

  plan: DienstPlan = new DienstPlan();
  notifications: Array<NotificationEntry> = [];
  private isPersistent = false;
  private paramsSub;

  groups = [];
  notificationGroups = {};


  constructor(private service: PlanPersistenceService,
              private notificationService: NotificationControlService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  savePlan() {
    this.service.savePlan(this.plan).subscribe(savedPlan => this.router.navigate([`/plan/${this.plan.uuid}/notification`]));
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.parent.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID && planUUID != 'new') {
        this.isPersistent = true;

        this.service.fetchPlan(planUUID).subscribe(plan=> {
          this.plan = plan;
          this.refreshNotifications();
        });

      }
    });
  }

  removePlan() {
    this.service.removePlan(this.plan.uuid).subscribe(()=>this.navDashboard());
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  refreshNotifications() {
    this.notificationService.fetchGroupNotifications(this.plan.uuid).subscribe(notifications=> {
      this.notifications = notifications;
      this.getGroupedNotifications();
    });
  }

  getGroupedNotifications() {
    var retVal = {};
    this.groups = [];

    var groupDict = {};
    this.plan.groupList.forEach(group=> {
      groupDict[group.uuid] = group;
    });

    this.notifications.forEach((notification: NotificationEntry)=> {
      if (!retVal[notification.category[1]]) {
        retVal[notification.category[1]] = {};
        retVal[notification.category[1]].persons = [];
        retVal[notification.category[1]].notificationMap = {};
        retVal[notification.category[1]].group = groupDict[notification.category[1]];
        this.groups.push(notification.category[1]);
      }

      if (retVal[notification.category[1]].persons.indexOf(notification.recipientUUID) == -1) {
        retVal[notification.category[1]].persons.push(notification.recipientUUID);
        retVal[notification.category[1]].notificationMap[notification.recipientUUID] = [];
      }
      retVal[notification.category[1]].notificationMap[notification.recipientUUID].push(notification);
    });

    this.notificationGroups = retVal;

  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
