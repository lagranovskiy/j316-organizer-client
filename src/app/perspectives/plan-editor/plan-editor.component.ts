import {Component, ViewChildren, QueryList, ViewChild, ChangeDetectionStrategy, AfterViewInit} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import {isUndefined} from "util";
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
export class PlanEditorComponent implements AfterViewInit {


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


  savePlan() {
    this.groupViews.toArray().forEach(view=>view.stopEditing());
    this.completeBesetzungArrays();
    this.planActions.saveDienstPlan(this.plan);

  }

  addDienstPlanGruppe() {
    let newGroup = new DienstPlanGruppe();
    this.plan.groupList.unshift(newGroup);
  }

  removeDienstPlanGruppe(gruppe) {
    this.plan.groupList.splice(this.plan.groupList.indexOf(gruppe), 1);
  }


  completeBesetzungArrays() {
    this.plan.groupList.map(gruppe=> {
      gruppe.sections.map(teilgruppe=> {
        for (let index = 0; index < this.plan.eventDates.length; index++) {
          if (isUndefined(teilgruppe.besetzung[index]) || teilgruppe.besetzung[index] == null) {
            teilgruppe.besetzung[index] = false;
          }
        }
      })
    });
  }

  onChanges(key, value) {
    this.planActions.updatePlanData(this.plan, key, value);
  }

  ngAfterViewInit(): void {
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
