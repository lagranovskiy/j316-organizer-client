import {Component, OnInit, QueryList, AfterViewInit} from '@angular/core';
import {ViewChildren, ViewChild} from "@angular/core/src/metadata/di";
import {isUndefined} from "util";
import {DienstPlan} from "../../model/DienstPlan";
import {Router, ActivatedRoute} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";


export class PlanEditingView {

  saveStarted() {
  };

  setPlan(plan: DienstPlan) {
  };

  getPlan(): DienstPlan {
    return null;
  };

  isValid(): boolean {
    return false;
  };

}

@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrls: ['./plan-view.component.css']
})
export class PlanViewComponent implements AfterViewInit {


  @ViewChild(PlanEditingView)
  private planEditingView: PlanEditingView;

  private paramsSub;


  constructor(private service: PlanPersistenceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }


  saveChanges() {
    this.planEditingView.saveStarted();
    let plan = this.planEditingView.getPlan();
    this.service.savePlan(plan).subscribe(savedPlan => this.router.navigate([`/plan/${plan.uuid}`]));

  }

  isSavePossible() {
    return this.planEditingView.isValid();
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  removePlan() {
    let plan = this.planEditingView.getPlan();
    this.service.removePlan(plan.uuid).subscribe(()=>this.navDashboard());
    this.navDashboard();
  }


  ngAfterViewInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID) {
        this.service.fetchPlan(planUUID).subscribe(plan=> {
          this.planEditingView.setPlan(plan);
        });
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
