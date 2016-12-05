import {Pipe, PipeTransform} from "@angular/core";
import {NotificationEntry} from "../model/NotificationEntry";
import {DienstPlanGruppe} from "../model/DienstPlanGruppe";

@Pipe({
  name: 'groupByDienstPlanGroup'
})
export class NotificatationDienstGroupPipe implements PipeTransform {

  /**
   * Transforms given notifications on the given groups
   * @param notificationList list to be transformed
   * @param groupList groups for transformation lookup
   * @return {Array<{name: "", children: Array<NotificationEntry>}>}
   */
  transform(notificationList: Array<NotificationEntry>, groupList: Array<DienstPlanGruppe>): any {
    var retVal: Array<{ uuid: string, name: string, children: Array<NotificationEntry> }> = [];

    groupList.forEach(groupModel => {
      let filteredNotifications = notificationList.filter(notification => notification.category[1] == groupModel.uuid);
      if (filteredNotifications.length > 0) {
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
