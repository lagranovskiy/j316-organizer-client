import {Component, OnInit} from '@angular/core';
import {DienstPlan} from "../../model/DienstPlan";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";

@Component({
  selector: 'app-plan-notification-view',
  templateUrl: './plan-notification-view.component.html',
  styleUrls: ['./plan-notification-view.component.css']
})
export class PlanNotificationViewComponent implements OnInit {

  plan: DienstPlan = new DienstPlan();

  private paramsSub;

  constructor(private service: PlanPersistenceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }



  isSaveAllowed(){
    return true;
  }
  savePlan() {
    this.service.savePlan(this.plan).subscribe(savedPlan => this.router.navigate([`/plan/${this.plan.uuid}`]));

  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.parent.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID) {
        this.service.fetchPlan(planUUID).subscribe(plan=> {
          this.plan = plan;
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

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
