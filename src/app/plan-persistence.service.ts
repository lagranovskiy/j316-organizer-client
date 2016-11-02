import {Injectable} from "@angular/core";
import {DienstPlan} from "./model/DienstPlan";

@Injectable()
export class PlanPersistenceService {

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

    let persistentPlan = this.fetchPlanById(newPlanVersion.uid);
    if (persistentPlan != null) {
      allPersistentPlans.splice(allPersistentPlans.indexOf(persistentPlan), 1);
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


  constructor() {
  }

}
