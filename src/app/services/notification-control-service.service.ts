import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {NotificationEntry} from "../model/NotificationEntry";
import {AuthHttp} from "angular2-jwt";
import {AlertService} from "./alert.service";

@Injectable()
export class NotificationControlService {

  constructor(private http: AuthHttp, private alertService: AlertService) {
  }

  /**
   * Start sending of plan notifications
   *
   * @return {Observable<NotificationEntry>}
   */
  public startPlanNotification(uuid: string): Observable<any> {
    return this.http.post(`/api/serviceplan/${uuid}/notifications/start`, {})
      .map(data => {
          let body = data.json();
          let retVal: NotificationEntry[] = [];
          body.map(planData => {
            let planSourceData = planData.request;
            if (planData.success) {
              planSourceData._id = planData.result.data;
              planSourceData.success = planData.success;
              planSourceData.status = planData.result.result;
            } else {
              planSourceData._id = 'noid';
              planSourceData.success = false;
              planSourceData.status = planData.errorMessage;
            }
            retVal.push(new NotificationEntry(planSourceData))
          });
          return retVal;
        }
      )
      .catch(this.alertService.handleHttpError);
  }


  /**
   * Fetches notifications of a group (plan or plan group)
   *
   * @return {Observable<NotificationEntry>}
   */
  public fetchGroupNotifications(uuid: string): Observable<NotificationEntry[]> {
    return this.http.get(`/api/serviceplan/${uuid}/notifications`)
      .map(data => {
          let body = data.json();
          let retVal: NotificationEntry[] = [];
          if (body.length) {
            body.map(planData => retVal.push(new NotificationEntry(planData)));
            return retVal;
          } else {
            return [];
          }
        }
      )
      .catch(this.alertService.handleHttpError);
  }

  /**
   * Fetches notifications of a person
   *
   * @return {Observable<NotificationEntry>}
   */
  public fetchPersonNotifications(uuid: string): Observable<NotificationEntry[]> {
    return this.http.get(`/api/person/${uuid}/notifications`)
      .map(data => {
          let body = data.json();
          if (body.length) {
            let retVal: NotificationEntry[] = [];
            body.map(planData => retVal.push(new NotificationEntry(planData)));
            return retVal;
          } else {
            return [];
          }
        }
      )
      .catch(this.alertService.handleHttpError);
  }


  /**
   * Removes notifications of a group (plan or plan group)
   *
   * @return {Observable<any>}
   */
  public cancelGroupNotifications(uuid: string): Observable<any> {
    return this.http.delete(`/api/serviceplan/${uuid}/notifications`)
      .map(data => {
          let body = data.json();
          return body;
        }
      )
      .catch(this.alertService.handleHttpError);
  }

  /**
   * Removes notifications of a person
   *
   * @return {Observable<any>}
   */
  public cancelPersonNotifications(uuid: string): Observable<any> {
    return this.http.delete(`/api/person/${uuid}/notifications`)
      .map(data => {
          let body = data.json();
          return body;
        }
      )
      .catch(this.alertService.handleHttpError);
  }

  /**
   * Removes notifications of a person/group
   *
   * @return {Observable<any>}
   */
  public cancelPersonGroupNotifications(groupUUID: string, personUUID: string): Observable<any> {
    // /serviceplan/:planUUID/person/:personUUID/notifications
    return this.http.delete(`/api/serviceplan/${groupUUID}/person/${personUUID}/notifications`)
      .map(data => {
          let body = data.json();
          return body;
        }
      )
      .catch(this.alertService.handleHttpError);
  }

}
