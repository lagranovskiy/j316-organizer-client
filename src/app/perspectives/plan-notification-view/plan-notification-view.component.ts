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
        this.isPersistent=true;

        this.service.fetchPlan(planUUID).subscribe(plan=> this.plan = plan);
        this.notificationService.fetchGroupNotifications(planUUID).subscribe(notifications=>this.notifications = notifications);
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

  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
