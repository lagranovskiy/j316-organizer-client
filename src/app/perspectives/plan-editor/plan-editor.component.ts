import {Component, OnInit, ViewChildren, QueryList, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../../plan-persistence.service";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import {PlanTableComponent} from "../../plan/plan-table/plan-table.component";
import {isUndefined} from "util";

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


  constructor(private service: PlanPersistenceService,
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
    this.completeBesetzungArrays();

    this.service.savePlan(this.plan).subscribe(savedPlan => this.router.navigate([`/plan/${this.plan.uuid}`]));
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
