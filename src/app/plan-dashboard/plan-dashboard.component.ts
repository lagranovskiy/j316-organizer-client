import {Component, OnInit, EventEmitter} from '@angular/core';
import {PlanPersistenceService} from '../plan-persistence.service';
import {DienstPlan} from "../model/DienstPlan";


@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css']
})
export class PlanDashboardComponent implements OnInit {

  private planList: Array<DienstPlan>;

  constructor(private service: PlanPersistenceService) {
    this.planList = service.fetchPlansFromStorage();
  }


  private createNewDienstplan() {
    let newPlan = new DienstPlan();
    newPlan.planInformation.planName = 'Neue Plan';
    this.planList.push(newPlan);
  }

  private openPlan(){

  }

  private removePlan(plan){
    this.planList.splice(this.planList.indexOf(plan), 1);
  }

  private savePlans() {
    this.service.savePlansToStorage(this.planList);
  }

  ngOnInit() {
  }

}
