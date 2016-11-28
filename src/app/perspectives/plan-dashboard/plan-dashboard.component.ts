import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {DienstPlan} from "../../model/DienstPlan";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {select} from "ng2-redux";
import {List} from "immutable";
import {DienstPlanActions} from "../../actions/DienstPlanActions";


@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css']
})
export class PlanDashboardComponent implements OnInit {


  @select(['dienstPlan', 'planList'])
  private refreshPlans: Observable<List<DienstPlan>>;


  constructor(private planActions: DienstPlanActions) {
  }

  private createNewDienstplan() {
    this.planActions.createNewDienstPlan();
  }

  private openPlan(plan) {
    this.planActions.selectDienstPlan(plan);
  }

  private removePlan(plan) {
    this.planActions.removeDienstPlan(plan);
    //this.service.removePlan(plan.uuid).subscribe(()=>this.refreshData());
  }


  private clonePlan(duplicatePlan) {
    this.planActions.cloneDienstPlan(duplicatePlan);
  }

  ngOnInit() {
  }


}
