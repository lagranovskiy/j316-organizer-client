import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";


@Component({
  selector: 'plan-navigation-toolbar',
  templateUrl: './plan-navigation-toolbar.component.html',
  styleUrls: ['./plan-navigation-toolbar.component.css']
})
export class PlanNavigationToolbarComponent implements OnInit {

  @Input()
  isSaveAllowed: Function;

  @Input()
  isPersistent: Function;

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  backClicked: EventEmitter<any> = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit() {
  }

  callSaveClicked() {
    this.saveClicked.emit('');
  }

  callRemoveClicked() {
    this.removeClicked.emit('');
  }


  callGoBack() {
    this.backClicked.emit('');
  }
}