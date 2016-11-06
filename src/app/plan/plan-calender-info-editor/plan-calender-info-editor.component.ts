import {Component, OnInit, Input} from '@angular/core';
import {DienstPlan} from "../../model/DienstPlan";

@Component({
  selector: 'plan-calender-info-editor',
  templateUrl: './plan-calender-info-editor.component.html',
  styleUrls: ['./plan-calender-info-editor.component.css']
})
export class PlanCalenderInfoEditorComponent implements OnInit {


  @Input()
  private model: DienstPlan;

  constructor() {
  }

  ngOnInit() {
  }

}
