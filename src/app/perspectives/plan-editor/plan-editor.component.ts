import {Component, OnInit, ViewChildren, QueryList} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {GruppeViewComponent} from "../../plan/gruppe-view/gruppe-view.component";
import {isUndefined} from "util";
import {PlanEditingView} from "../plan-view/plan-view.component";


@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent extends PlanEditingView implements OnInit {


  private plan: DienstPlan = new DienstPlan();

  @ViewChildren(GruppeViewComponent)
  private groupViews: QueryList < GruppeViewComponent >;


  constructor() {
    super();
  }

  isValid() {
    //planForm.form.valid
    return true;
  }

  setPlan(plan: DienstPlan) {
    this.plan = plan;
  }

  getPlan() {
    return this.plan;
  }

  saveStarted() {
    this.groupViews.toArray().forEach(view=>view.stopEditing());
    this.completeBesetzungArrays();

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
  }

}
