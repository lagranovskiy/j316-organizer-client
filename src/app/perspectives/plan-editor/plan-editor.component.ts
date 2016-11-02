import {Component, OnInit, ViewChildren, QueryList} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import any = jasmine.any;

@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {

  private planUID: string;
  private plan: DienstPlan = null;

  private paramsSub;

  @ViewChildren(GruppeViewComponent)
  private groupViews: QueryList<GruppeViewComponent>;

  constructor(private service: PlanPersistenceService,
              private personService: ParticipantPersistenceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  addDienstPlanGruppe() {
    let newGroup = new DienstPlanGruppe();

    this.plan.groupList.push(newGroup);
  }

  removeDienstPlanGruppe(gruppe) {
    this.plan.groupList.splice(this.plan.groupList.indexOf(gruppe), 1);
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  removePlan() {
    this.service.removePlan(this.plan);
    this.navDashboard();
  }

  saveChanges() {
    this.groupViews.toArray().forEach(view=>view.stopEditing());

    this.service.upsertPlan(this.plan);
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let test = params["uid"];
      this.planUID = test;

      if (this.planUID) {
        this.plan = this.service.fetchPlanById(this.planUID);
      } else {
        this.plan = new DienstPlan();
        this.plan.planName = 'Neue Plan';
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
