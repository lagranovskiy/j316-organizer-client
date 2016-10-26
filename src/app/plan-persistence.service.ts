import {Injectable} from '@angular/core';
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
    })

    return retVal
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
  }


  constructor() {
  }

}
