import {Component, OnInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationControlService} from "../../services/notification-control-service.service";
import {NotificationEntry} from "../../model/NotificationEntry";
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

        this.refreshNotifications();
      }
    });
  }


  savePlan() {
    this.service.savePlan(this.plan).subscribe(savedPlan => this.router.navigate([`/plan/${this.plan.uuid}/notification`]));
  }

  planActived(active: boolean){
    this.plan.planActive = active;
    this.savePlan();
  }


  removePlan() {
    this.service.removePlan(this.plan.uuid).subscribe(() => this.navDashboard());
  }

  navDashboard() {
    this.router.navigate(['/plans']);
  }

  refreshNotifications() {
    this.notificationService.fetchGroupNotifications(this.plan.uuid).subscribe(notifications => {
      this.notifications = notifications;
    });
  }


  /**
   * Remove notifications from group=planGroupUUID and/or group=planGroupUUID && referenceId=personUUID
   */
  groupNotifcationRemove(planGroupUUID: string, personUUID: string) {
    console.info("Removing: " + planGroupUUID + "   " + personUUID);

    if (planGroupUUID != null && personUUID == null) {
      // Remove all notifications of group
      this.notificationService.cancelGroupNotifications(planGroupUUID).subscribe(() => this.refreshNotifications());
    } else {
      // Remove group/person combinations
      this.notificationService.cancelPersonGroupNotifications(planGroupUUID, personUUID).subscribe(() => this.refreshNotifications());
    }
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  ngOnInit() {

  }

}
