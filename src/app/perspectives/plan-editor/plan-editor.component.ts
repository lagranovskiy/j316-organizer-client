import {Component, ViewChildren, QueryList, ViewChild, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Participant} from "../../model/Participant";
import {List} from "immutable";
import {Observable} from "rxjs";
import {select} from "ng2-redux";
import {DienstPlanActions} from "../../actions/DienstPlanActions";

/**
 * http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
 */
@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanEditorComponent implements OnInit {


  private plan: DienstPlan = null;

  @select(['dienstPlan', 'selectedPlan'])
  private plan$: Observable<DienstPlan>;

  @select(['person', 'personList'])
  private personList$: Observable<List<Participant>>;

  private isPersistent = false;

  private paramsSub;

  @ViewChildren(GruppeViewComponent)
  private groupViews: QueryList < GruppeViewComponent >;


  @ViewChild(NgForm)
  public planForm: NgForm;

  constructor(private planActions: DienstPlanActions,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.plan$.subscribe(plan=> {
      this.plan = plan;
    });
  }

  ngOnInit(): void {
    this.paramsSub = this.activatedRoute.parent.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID && planUUID != 'new') {
        this.isPersistent = true;
        this.planActions.fetchDienstPlan(planUUID);
      } else {
        this.isPersistent = false;
      }
    });
  }


  savePlan() {
    this.groupViews.toArray().forEach(view=>view.stopEditing());
    this.planActions.saveDienstPlan(this.plan);

  }

  addDienstPlanGruppe() {
    let newGroup = new DienstPlanGruppe();
    this.plan.groupList.unshift(newGroup);
  }

  removeDienstPlanGruppe(gruppe) {
    this.plan.groupList.splice(this.plan.groupList.indexOf(gruppe), 1);
  }


  onChanges(key, value) {
    this.planActions.updatePlanData(this.plan, key, value);
  }


  removePlan() {
    this.planActions.removeDienstPlan(this.plan.uuid);
    this.navDashboard();
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


}
