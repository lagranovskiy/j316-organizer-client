import {Component, OnInit, ViewChildren, QueryList, ViewChild} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import {isUndefined} from "util";
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AppStoreService} from "../../app-store.service";
import {List} from "immutable";


@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {


  private plan: DienstPlan = new DienstPlan();
  private isPersistent = false;

  private paramsSub;

  @ViewChildren(GruppeViewComponent)
  private groupViews: QueryList < GruppeViewComponent >;

  @ViewChild(NgForm)
  public planForm: NgForm;

  constructor(private service: AppStoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  savePlan() {
    this.groupViews.toArray().forEach(view=>view.stopEditing());
    this.completeBesetzungArrays();
    this.service.savePlan(this.plan).subscribe(savedPlan => this.router.navigate([`/plan/${this.plan.uuid}`]));

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

  ngOnInit() {
    this.paramsSub = this.activatedRoute.parent.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID && planUUID != 'new') {
        this.isPersistent = true;
        this.service.planList.subscribe((planList: List<DienstPlan>)=> {
          let foundIndex = planList.findIndex(plan=>planUUID == plan.uuid);
          if (foundIndex > -1) {
            this.plan = planList.get(foundIndex);
          }
        });
      }
    });
  }

  removePlan() {
    this.service.removePlan(this.plan.uuid).subscribe(()=>this.navDashboard());
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


}
