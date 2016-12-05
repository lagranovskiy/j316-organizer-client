import {Component, OnInit, Input} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;


  toggleVerfuegbarkeit(teilGruppe: DienstPlanTeilgruppe, dayIndex: number) {
    if (teilGruppe.verfuegbarkeit[dayIndex] === undefined) {
      teilGruppe.verfuegbarkeit[dayIndex] = false;
    }
    teilGruppe.verfuegbarkeit[dayIndex] = !teilGruppe.verfuegbarkeit[dayIndex];

  }

  countBesetzungen(teilgruppe: DienstPlanTeilgruppe) {
    // .reduce((accum, current)=>accum + current, '');
    return teilgruppe.besetzung.reduce((previousValue: number, currentValue: boolean, currentIndex: number, array: boolean[])=> {
      let retVal = previousValue;
      if (currentIndex < this.plan.eventDates.length && currentValue) {
        retVal += 1;
      }
      return retVal;
    }, 0);
  }

  ngOnInit() {
  }

}
