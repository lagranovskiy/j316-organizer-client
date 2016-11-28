import {Component, OnInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {NotificationControlService} from "../../notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";
import {DisplayableModel} from "../../model/interfaces/DisplayableModel";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";

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

        this.service.fetchPlan(planUUID).subscribe(plan => {
          this.plan = plan;
          this.refreshNotifications();
        });

      }
    });
  }

  removePlan() {
    this.service.removePlan(this.plan.uuid).subscribe(() => this.navDashboard());
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  refreshNotifications() {
    this.notificationService.fetchGroupNotifications(this.plan.uuid).subscribe(notifications => {
      this.notifications = notifications;
    });
  }


  groupByGroup(): (notification: NotificationEntry) => DisplayableModel {
    let _me = this;
    return (notification: NotificationEntry): DisplayableModel => {
      let groupUUID = notification.category[1];
      let foundGroups = _me.plan.groupList.filter((group: DienstPlanGruppe) => group.uuid == groupUUID);
      if (foundGroups.size == 0) {
        console.error('Illegal State. Cannot find group where notifications exist for. Deleted?')
        return null;
      }
      return foundGroups[0];
    }

  }

  groupByPerson(): (notification: NotificationEntry) => DisplayableModel {
    return (notification: NotificationEntry): DisplayableModel => {
      let personUUID = notification.recipientUUID;
      return <DisplayableModel>
        {
          uuid: personUUID,
          getDescription: () => null,
          getTitle: () => notification.recipient
        }
    }

  }

  /**
   * Remove notifications from group=group1UUID and/or group=group1UUID && referenceId=group2UUID
   */
  groupNotifcationRemove(data: { group1UUID: string, group2UUID: string }) {
    console.info("Removing: " + data.group1UUID + "   " + data.group2UUID);

    if (data.group1UUID != null && data.group2UUID==null) {
      // Remove all notifications of group
      this.notificationService.cancelGroupNotifications(data.group1UUID).subscribe(() => this.refreshNotifications());
    } else {
      // Remove group/person combinations
      this.notificationService.cancelPersonGroupNotifications(data.group1UUID, data.group2UUID).subscribe(() => this.refreshNotifications());
    }
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
