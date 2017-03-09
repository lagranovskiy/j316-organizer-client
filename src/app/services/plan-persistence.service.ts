import {Injectable} from "@angular/core";
import {DienstPlan} from "../model/DienstPlan";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";
import {AlertService} from "./alert.service";
import {NotificationControlService} from "./notification-control-service.service";

@Injectable()
export class PlanPersistenceService {

  constructor(private http: AuthHttp,
              private alertService: AlertService,
              private notificationService: NotificationControlService) {
  }

  /**
   * Fetches all Plans from server
   */
  public fetchPlans(): Observable<DienstPlan[]> {
    return this.http.get('/api/serviceplan')
      .map(data => {
          let body = data.json();
          let retVal: DienstPlan[] = [];
          body.map(planData => retVal.push(new DienstPlan(planData)));
          return retVal;
        }
      )
      .catch((err) => this.alertService.handleHttpError(err));
  }

  /**
   * Fetches all Plans from server
   */
  public fetchPlan(uuid: string): Observable<DienstPlan> {
    return this.http.get(`/api/serviceplan/${uuid}`)
      .map(data => {
          return new DienstPlan(data.json());
        }
      )
      .catch((err) => this.alertService.handleHttpError(err));
  }

  /**
   * Fetches all Plans from server
   */
  public removePlan(uuid: string): Observable<DienstPlan> {
    return this.http.delete(`/api/serviceplan/${uuid}`)
      .map(data => {
          return new DienstPlan(data.json());

        }
      )
      .map(data =>{
        this.notificationService.startPlanNotification(uuid).subscribe(() => {
        });
      })
      .catch((err) => this.alertService.handleHttpError(err));
  }

  /**
   * Saves a given plan
   * @param plan
   * @return {Observable<R>}
   */
  public savePlan(plan: DienstPlan): Observable<DienstPlan> {
    let data = plan.getData();
    return this.http.post('/api/serviceplan', data)
      .map(data => {
        return new DienstPlan(data.json());
      })
      .catch((err) => this.alertService.handleHttpError(err));
  }

}
