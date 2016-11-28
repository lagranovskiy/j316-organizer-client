import {Injectable, Inject} from "@angular/core";
import {DienstPlan} from "./model/DienstPlan";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {APP_CONFIG} from "./config/const";
import {AppConfig} from "./config/app.config";
import {DienstPlanFactory} from "./model/DienstPlanFactory";

@Injectable()
export class PlanPersistenceService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
    console.info(config.apiEndpoint);
  }

  /**
   * Fetches all Plans from server
   */
  public fetchPlans(): Observable<DienstPlan[]> {
    return this.http.get('/api/serviceplan')
      .map(data => {
          let body = data.json();
          let retVal: DienstPlan[] = [];
          body.map(planData => retVal.push(DienstPlanFactory.createDienstPlan(planData)));
          return retVal;
        }
      )
      .catch(this.handleError);
  }

  /**
   * Fetches all Plans from server
   */
  public fetchPlan(uuid: string): Observable<DienstPlan> {
    return this.http.get(`/api/serviceplan/${uuid}`)
      .map(data => {
          return DienstPlanFactory.createDienstPlan(data.json());
        }
      )
      .catch(this.handleError);
  }

  /**
   * Fetches all Plans from server
   */
  public removePlan(uuid: string): Observable<DienstPlan> {
    return this.http.delete(`/api/serviceplan/${uuid}`)
      .map(data => {
          return DienstPlanFactory.createDienstPlan(data.json());
        }
      )
      .catch(this.handleError);
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
        return DienstPlanFactory.createDienstPlan(data.json());
      })
      .catch(this.handleError);
  }




  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
