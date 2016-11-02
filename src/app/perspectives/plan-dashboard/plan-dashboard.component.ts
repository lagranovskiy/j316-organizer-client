import {Component, OnInit} from "@angular/core";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {DienstPlan} from "../../model/DienstPlan";
import {Router} from "@angular/router";


@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css']
})
export class PlanDashboardComponent implements OnInit {

  private planList: Array<DienstPlan>;

  constructor(private service: PlanPersistenceService, private router: Router) {
    this.planList = service.fetchPlansFromStorage();
  }

  private createNewDienstplan() {
    this.router.navigate([`/plan/`]);
  }

  private openPlan(plan) {
    this.router.navigate([`/plan/${plan.uid}`]);
  }

  private removePlan(plan) {
    this.service.removePlan(plan);
    this.planList = this.service.fetchPlansFromStorage();
  }

  private clonePlan(plan) {
    let newPlan = plan.clone();
    this.service.upsertPlan(newPlan);
    this.openPlan(newPlan);
  }

  ngOnInit() {
  }

}
