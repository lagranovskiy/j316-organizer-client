import {Component, OnInit, ViewChildren, QueryList, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import {PlanTableComponent} from "../../plan/plan-table/plan-table.component";
import any = jasmine.any;

@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {


  private plan: DienstPlan = new DienstPlan();

  private paramsSub;

  @ViewChildren(GruppeViewComponent)
  private groupViews: QueryList<GruppeViewComponent>;

  @ViewChild(PlanTableComponent)
  private planTable: PlanTableComponent;

  constructor(private service: PlanPersistenceService,
              private personService: ParticipantPersistenceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  addDienstPlanGruppe() {
    let newGroup = new DienstPlanGruppe();

    this.plan.groupList.unshift(newGroup);
  }

  removeDienstPlanGruppe(gruppe) {
    this.plan.groupList.splice(this.plan.groupList.indexOf(gruppe), 1);
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  removePlan() {
    this.service.removePlan(this.plan.uuid).subscribe(()=>this.navDashboard());
    this.navDashboard();
  }

  saveChanges() {
    this.groupViews.toArray().forEach(view=>view.stopEditing());
    this.planTable.completeBesetzungArrays();

    this.service.savePlan(this.plan).subscribe(savedPlan => this.plan = savedPlan);
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID) {
        this.service.fetchPlan(planUUID).subscribe(plan=> {
          this.plan = plan
        });
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
