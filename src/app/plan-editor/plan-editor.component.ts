import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../plan-persistence.service";
import {DienstPlan} from "../model/DienstPlan";
import any = jasmine.any;

@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {

  private planUID: string;
  private plan: DienstPlan = new DienstPlan();
  private paramsSub;

  constructor(private service: PlanPersistenceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.plan.planInformation.planName='Neue Plan';


  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  removePlan() {
    this.service.removePlan(this.plan);
    this.navDashboard();
  }

  saveChanges() {
    this.service.upsertPlan(this.plan);
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let test = params["uid"];
      this.planUID = test;

      if (this.planUID) {
        this.plan = this.service.fetchPlanById(this.planUID);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
