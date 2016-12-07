import {Component, OnInit, Input} from "@angular/core";
import {DienstPlan} from "../../model/DienstPlan";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;

  private showHorizontalSumm: boolean = false;
  private showVerticalSumm: boolean = false;


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


  countDayBesetzungen(gruppe: DienstPlanGruppe, dayIndex: number) {
    let retVal = {besetzt: 0, verfuegbar: 0};

    gruppe.sections.forEach(teilgruppe=> {
      if (teilgruppe.besetzung[dayIndex]) {
        retVal.besetzt++;
      }
      if (teilgruppe.verfuegbarkeit[dayIndex]) {
        retVal.verfuegbar++;
      }
    });
    return retVal;
  }

  ngOnInit() {
  }

}
