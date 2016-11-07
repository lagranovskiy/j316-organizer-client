import {Injectable, Inject} from "@angular/core";
import {DienstPlan} from "./model/DienstPlan";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {APP_CONFIG} from "./config/const";
import {AppConfig} from "./config/app.config";

@Injectable()
export class PlanPersistenceService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
    console.info(config.apiEndpoint);
  }

  /**
   * Fetches all Plans from server
   */
  public fetchFromServer(): Observable<Response> {
    return this.http.get('/api/serviceplan')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  /**
   * Fetches a list of persistent dienstplans
   *
   * @returns {DienstPlan[]}
   */
  public fetchPlansFromStorage() {
    let persistentInfo = localStorage.getItem('j316-plans');

    if (persistentInfo == null || persistentInfo === '') {
      return [];
    }

    let retVal: Array<DienstPlan> = [];

    let planArray = JSON.parse(persistentInfo) as Array<any>;
    planArray.forEach((value) => {
      retVal.push(new DienstPlan(value));
    });

    return retVal
  }

  /**
   * Fetches a plan information by the given uid
   *
   * @param uid
   */
  public fetchPlanById(uid: string) {
    let persistentPlans = this.fetchPlansFromStorage();
    let retVal = persistentPlans.filter((plan: DienstPlan)=> {
      return plan.uid === uid
    });

    if (retVal.length > 1) {
      console.error('Illegal state.. multiple plans with same uid');
      return null;
    }

    if (retVal.length == 0) {
      console.info('No Plans with give UID found');
      return null;
    }

    return retVal[0];
  }

  public removePlan(planForRemoval: DienstPlan) {
    let allPersistentPlans = this.fetchPlansFromStorage();
    let found = allPersistentPlans.filter(plan=>plan.uid === planForRemoval.uid);

    if (found.length == 0) {
      console.info('No Plans with give UID found. Cannot remove plan');
      return null;
    }

    let foundDienstplan = found[0];
    allPersistentPlans.splice(allPersistentPlans.indexOf(foundDienstplan), 1);
    this.savePlansToStorage(allPersistentPlans);
  }

  /**
   * Inserts or replace plan
   * @param newPlanVersion
   */
  public upsertPlan(newPlanVersion: DienstPlan) {
    let allPersistentPlans = this.fetchPlansFromStorage();

    let persistentPlan = allPersistentPlans.filter((plan: DienstPlan)=> {
      return plan.uid === newPlanVersion.uid
    });

    if (persistentPlan.length && persistentPlan.length === 1) {
      allPersistentPlans.splice(allPersistentPlans.indexOf(persistentPlan[0]), 1);
    }

    allPersistentPlans.push(newPlanVersion);
    this.savePlansToStorage(allPersistentPlans);
  }


  /**
   * Saves given list of plans to the storage
   * @param plans
   */
  public savePlansToStorage(plans: Array<DienstPlan>) {
    console.info('Saving current state to the storage');

    let persistentArray: Array<any> = [];

    plans.forEach((dienstPlan: DienstPlan)=> {
      persistentArray.push(dienstPlan.getData());
    });

    localStorage.setItem('j316-plans', JSON.stringify(persistentArray));

    return persistentArray;
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
