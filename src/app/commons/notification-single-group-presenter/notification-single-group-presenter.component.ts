import { Component, group, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationEntry } from '../../model/NotificationEntry';


@Component({
  selector: 'notification-single-group-presenter',
  templateUrl: './notification-single-group-presenter.component.html',
  styleUrls: ['./notification-single-group-presenter.component.css']
})
export class NotificationSingleGroupPresenterComponent implements OnInit {

  @Input()
  private groupName: string = '';


  @Input()
  private notificationList: Array<NotificationEntry> = [];

  @Output()
  private removeGroup: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }


  private removeClicked() {
    this.removeGroup.emit(this.groupName);
  }

  ngOnInit() {
  }

}
