import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {NotificationEntry} from "../model/NotificationEntry";

@Injectable()
export class NotificationControlService {

  constructor(private http: Http) {
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
      .catch(this.handleError);
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
      .catch(this.handleError);
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
      .catch(this.handleError);
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
      .catch(this.handleError);
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
      .catch(this.handleError);
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
      .catch(this.handleError);
  }


  /**
   * Handlers errors occured by requests
   * @param error error object
   * @param action action text
   * @return {ErrorObservable}
   */
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.toString();
    }
    console.error(`Problem occured :: ${errMsg}`);
    return Observable.throw(errMsg);
  }

}
