import {Component, OnInit} from "@angular/core";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {DienstPlan} from "../../model/DienstPlan";
import {Router} from "@angular/router";
import {Observable} from "rxjs";


@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css']
})
export class PlanDashboardComponent implements OnInit {

  private planList: Array<DienstPlan>;
  private refreshPlans: Observable<DienstPlan[]>;


  constructor(private service: PlanPersistenceService, private router: Router) {
    this.refreshPlans = service.fetchPlans();
  }

  private createNewDienstplan() {
    this.router.navigate([`/plan/new/edit`]);
  }

  private openPlan(plan) {
    this.router.navigate([`/plan/${plan.uuid}/edit`]);
  }

  private removePlan(plan) {
    this.service.removePlan(plan.uuid).subscribe(()=>this.refreshData());
  }


  private clonePlan(duplicatePlan) {
    let newPlan = duplicatePlan.clone();
    this.service.savePlan(newPlan).subscribe(savedPlan => {
      this.planList.unshift(savedPlan)
      this.openPlan(savedPlan);
    });

  }

  ngOnInit() {
    this.refreshData();
  }


  private refreshData() {
    this.refreshPlans.subscribe(planList=> {
      this.planList = planList
    });
  }

}
