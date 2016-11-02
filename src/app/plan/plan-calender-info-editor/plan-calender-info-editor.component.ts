import {Component, OnInit, Input} from '@angular/core';
import {DienstPlanCalenderInfo} from "../../model/DienstPlanCalenderInfo";

@Component({
  selector: 'plan-calender-info-editor',
  templateUrl: './plan-calender-info-editor.component.html',
  styleUrls: ['./plan-calender-info-editor.component.css']
})
export class PlanCalenderInfoEditorComponent implements OnInit {


  @Input()
  private model: DienstPlanCalenderInfo;

  constructor() { }

  ngOnInit() {
  }

}
