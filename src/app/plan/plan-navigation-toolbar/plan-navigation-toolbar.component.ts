import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";


@Component({
  selector: 'plan-navigation-toolbar',
  templateUrl: './plan-navigation-toolbar.component.html',
  styleUrls: ['./plan-navigation-toolbar.component.css']
})
export class PlanNavigationToolbarComponent implements OnInit {

  @Input()
    uUid: number;

  @Input()
  isSaveAllowed: boolean;

  @Input()
  isPersistent: boolean;

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  backClicked: EventEmitter<any> = new EventEmitter<any>();


  constructor(private router: Router) {
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

  navPrint () {
    //$event.preventDefault();
    //window.location.href=`/print/${this.uUid}`;
    this.router.navigate([`/print/${this.uUid}`]);
  }

}
