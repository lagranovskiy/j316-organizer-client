import {Component, OnInit} from '@angular/core';
import {DienstPlan} from "../../model/DienstPlan";

@Component({
  selector: 'app-plan-notification-view',
  templateUrl: './plan-notification-view.component.html',
  styleUrls: ['./plan-notification-view.component.css']
})
export class PlanNotificationViewComponent implements OnInit {

  plan: DienstPlan = new DienstPlan();

  constructor() {
  }

  ngOnInit() {
  }

}
