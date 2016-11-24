import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NotificationEntry } from "../../model/NotificationEntry";
import { DisplayableModel } from "../../model/DisplayableModel";
import { Input, Output } from "@angular/core/src/metadata/directives";

@Component({
  selector: 'notification-presenter',
  templateUrl: './notification-presenter.component.html',
  styleUrls: ['./notification-presenter.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NotificationPresenterComponent implements OnInit, OnChanges {


  @Input()
  private notificationList: Array<NotificationEntry> = [];

  @Input()
  private groupByFuncList: Array<(e: NotificationEntry) => DisplayableModel> = [];

  @Output()
  private groupRemoveClicked: EventEmitter<{ group1UUID: string, group2UUID: string }> = new EventEmitter<{ group1UUID: string, group2UUID: string }>();;

  private groupedResult = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (!changes['notificationList'] || changes['notificationList'] && changes['notificationList'].currentValue.length == changes['notificationList'].previousValue.length) &&
      (!changes['groupByFuncList'] || changes['groupByFuncList'] && changes['groupByFuncList'].currentValue.length == changes['groupByFuncList'].previousValue.length)) {
      return;
    }
    this.createComposite();
  }

  private triggerUpdate(group1UUID: string, group2UUID: string) {
    this.groupRemoveClicked.emit({ group1UUID: group1UUID, group2UUID: group2UUID })
  }


  private createComposite() {
    var retVal = { name: '', uuid: '', children: [] };
    this.notificationList.forEach(notification => {

      let currentGroupingItem = retVal;

      this.groupByFuncList.forEach((groupFunction: (e: NotificationEntry) => DisplayableModel, groupingLevel: number) => {

        let groupModel: DisplayableModel = groupFunction(notification);
        // Search if grouping item of the level exist
        let groupingItems: Array<any> = currentGroupingItem.children.filter(groupItem => {
          return groupItem.uuid == groupModel.uuid
        });

        // set it if exist
        if (groupingItems.length > 0) {
          currentGroupingItem = groupingItems[0];
        } else {
          // Create new add to RetVal and set to current
          let subGroupingItem = { uuid: groupModel.uuid, name: groupModel.getTitle(), children: [] };
          currentGroupingItem.children.push(subGroupingItem);
          currentGroupingItem = subGroupingItem;
        }

        if (groupingLevel == this.groupByFuncList.length - 1) {
          currentGroupingItem.children.push(notification);
        }

      })

    });

    this.groupedResult = retVal;
  }
}
