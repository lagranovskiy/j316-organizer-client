import {Component, OnInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationControlService} from "../../services/notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";
import {DisplayableModel} from "../../model/interfaces/DisplayableModel";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {AppStoreService} from "../../services/app-store.service";
import {List} from "immutable";

@Component({
  selector: 'app-plan-notification-view',
  templateUrl: './plan-notification-view.component.html',
  styleUrls: ['./plan-notification-view.component.css']
})
export class PlanNotificationViewComponent implements OnInit {

  private planUUID: string;

  private plan: DienstPlan = new DienstPlan();
  private notifications: Array<NotificationEntry> = [];
  private isPersistent = false;
  private paramsSub;


  constructor(private service: AppStoreService,
              private notificationService: NotificationControlService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.paramsSub = this.activatedRoute.parent.params.subscribe(params => {
      this.planUUID = params["uuid"];
    });

    this.service.planList.subscribe((planList: List<DienstPlan>)=> {
      let foundIndex = planList.findIndex(plan=>this.planUUID == plan.uuid);
      if (foundIndex > -1) {
        this.plan = planList.get(foundIndex);
        this.isPersistent = true;
      }
    });
  }


  savePlan() {
    this.service.savePlan(this.plan).subscribe(savedPlan => this.router.navigate([`/plan/${this.plan.uuid}/notification`]));
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
      if (foundGroups.length == 0) {
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

    if (data.group1UUID != null && data.group2UUID == null) {
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

  ngOnInit() {

  }

}
