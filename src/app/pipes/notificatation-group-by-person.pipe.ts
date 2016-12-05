import {Pipe, PipeTransform} from "@angular/core";
import {NotificationEntry} from "../model/NotificationEntry";

@Pipe({
  name: 'groupByPerson'
})
export class NotificatationPersonGroupPipe implements PipeTransform {

  transform(notificationList: Array<NotificationEntry>): any {
    var retVal: Array<{ uuid: string, name: string, children: Array<NotificationEntry> }> = [];

    notificationList.forEach(notification => {
      let foundEntry = retVal.filter(entry=>entry.uuid == notification.recipientUUID);
      if (foundEntry && foundEntry.length > 0) {
        foundEntry[0].children.push(notification);
      } else {
        retVal.push({
          uuid: notification.recipientUUID,
          name: notification.recipient,
          children: [notification]
        });
      }
    });
    return retVal;
  }

}
