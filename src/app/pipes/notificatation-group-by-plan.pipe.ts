import {Pipe, PipeTransform} from "@angular/core";
import {DienstPlan} from "../model/DienstPlan";
import {NotificationEntry} from "../model/NotificationEntry";

@Pipe({
  name: 'groupByDienstPlan',
  pure: true
})
export class NotificatationDienstPlanGroupPipe implements PipeTransform {

  transform(notificationList: Array<NotificationEntry>, dienstPlanList: Array<DienstPlan>): any {
    var retVal: Array<{ uuid: string, name: string, children: Array<NotificationEntry> }> = [];

    dienstPlanList.forEach(groupModel => {
      let filteredNotifications = notificationList.filter(notification => notification.category[0] == groupModel.uuid);
      if(filteredNotifications.length>0) {
        retVal.push({
          uuid: groupModel.uuid,
          name: groupModel.getTitle(),
          children: filteredNotifications
        })
      }

    });
    return retVal;
  }

}
