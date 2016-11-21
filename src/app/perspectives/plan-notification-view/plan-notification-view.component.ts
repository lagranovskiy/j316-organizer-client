import {Component, OnInit} from '@angular/core';
import {PlanEditingView} from "../plan-view/plan-view.component";
import {DienstPlan} from "../../model/DienstPlan";

@Component({
  selector: 'app-plan-notification-view',
  templateUrl: './plan-notification-view.component.html',
  styleUrls: ['./plan-notification-view.component.css']
})
export class PlanNotificationViewComponent extends PlanEditingView implements OnInit {

  plan: DienstPlan = new DienstPlan();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  saveStarted() {
  };

  setPlan(plan: DienstPlan) {
    this.plan = plan;
  };

  getPlan(): DienstPlan {
    return this.plan;
  };

  isValid(): boolean {
    return true;
  };

}
