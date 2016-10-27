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

  private dummyPersonen: Array<any> = [
    {name: 'Niki Wulfert', uid: '12345df66'},
    {name: 'Wasilij Kloss', uid: '123a4566'},
    {name: 'Max Wulfert', uid: '12s34566'},
    {
      name: 'Max Schaubert',
      uid: '12d3566'
    }, {name: 'Niki Loos', uid: '12dcvv34566'}];

  private dummyGroups: Array<any> = [
    {name: 'Gruppe1', uid: '12345df66'},
    {name: 'Gruppe2', uid: '123a4566'},
    {name: 'Gruppe3', uid: '12s34566'},
  ];

  constructor(private service: PlanPersistenceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.plan.planInformation.planName = 'Neue Plan';


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
