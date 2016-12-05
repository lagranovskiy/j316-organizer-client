import {Component, OnInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AppStoreService} from "../../services/app-store.service";
import {List} from "immutable";


@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css']
})
export class PlanDashboardComponent implements OnInit {

  private planList: List<DienstPlan>;
  private refreshPlans: Observable<DienstPlan[]> ;

  private searchString: string;


  constructor(private service: AppStoreService, private router: Router) {
    this.service.planList.subscribe(plans => this.planList=plans);
  }

  private openPlan(plan) {
    this.router.navigate([`/plan/${plan.uuid}/edit`]);
  }

  private removePlan(plan) {
    this.service.removePlan(plan.uuid).subscribe(()=>{});
  }

  private createNewDienstplan() {
    this.router.navigate([`/plan/new/edit`]);
  }

  private clonePlan(duplicatePlan) {
    let newPlan = duplicatePlan.clone();
    this.service.savePlan(newPlan).subscribe(savedPlan => {
      this.openPlan(savedPlan);
    });
  }



  ngOnInit() {
  }



}
