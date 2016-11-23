import {Component, OnInit} from '@angular/core';
import {NotificationEntry} from "../../model/NotificationEntry";
import {Input} from "@angular/core/src/metadata/directives";

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

  constructor() {
  }

  ngOnInit() {
  }

}
