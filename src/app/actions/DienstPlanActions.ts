import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {PlanPersistenceService} from "../plan-persistence.service";
import {List} from "immutable";
import {IAppState} from "../reducers/index";
import {DienstPlan} from "../model/DienstPlan";
import {Router} from "@angular/router";

export interface IDienstPlanAction {
  type: string;
  payload?: {
    plan?: DienstPlan,
    planList?: List<DienstPlan>
  }
  error?: string;
}

/**
 * Actions on the DienstPlan
 */
@Injectable()
export class DienstPlanActions {
  constructor(private ngRedux: NgRedux<IAppState>,
              private planService: PlanPersistenceService,
              private router: Router) {
  }

  static PLAN_SELECTED: string = 'PLAN_SELECTED';
  static PLAN_LOADED: string = 'PLAN_LOADED';
  static PLAN_UPDATED: string = 'PLAN_UPDATED';
  static PLAN_REMOVED: string = 'PLAN_REMOVED';
  static PLAN_COM_ERROR: string = 'PLAN_COM_ERROR';

  public updatePlanData(plan: DienstPlan, key: string, value: any) {
    plan = plan.setField(key, value);
    this.ngRedux.dispatch(this.createPlanUpdatedAction(plan));
  }


  public loadDienstPlans() {
    this.planService.fetchPlans()
      .subscribe(savedPlans=> this.ngRedux.dispatch(this.createPlanLoadedAction(List<DienstPlan>(savedPlans))))
  }

  public saveDienstPlan(plan: DienstPlan) {

    let savePlanSub = this.planService.savePlan(plan);
    savePlanSub.subscribe(savedPlan=> this.ngRedux.dispatch(this.createPlanUpdatedAction(savedPlan)));
    return savePlanSub;

  }

  public removeDienstPlan(planUUID: string) {
    this.planService.removePlan(planUUID)
      .subscribe(savedPlan=> this.ngRedux.dispatch(this.createPlanRemovedAction(savedPlan)))

  }

  public createNewDienstPlan() {
    this.ngRedux.dispatch(this.createPlanSelectedAction(new DienstPlan()));
    this.router.navigate([`/plan/new/edit`]);
  }

  public cloneDienstPlan(plan: DienstPlan) {
    let newPlan = plan.clone();

    this.saveDienstPlan(newPlan).subscribe(savedPlan => {
      this.selectDienstPlan(savedPlan);
    });
  }

  public fetchDienstPlan(planUUID: string) {


    let plans: List<DienstPlan> = this.ngRedux.getState().dienstPlan.get('planList').filter(plan=>plan.uuid == planUUID);
    if (plans.size == 0) {
      // Not loaded yet.. load actively extra
      this.planService.fetchPlan(planUUID).subscribe(plan=> this.ngRedux.dispatch(this.createPlanSelectedAction(plan)))
      return
    }else{
      this.ngRedux.dispatch(this.createPlanSelectedAction(plans.first()));
    }
  }

  public selectDienstPlan(plan: DienstPlan) {

    this.ngRedux.dispatch(this.createPlanSelectedAction(plan));
    this.router.navigate([`/plan/${plan.uuid}/edit`]);
  }


  private createPlanUpdatedAction(plan: DienstPlan): IDienstPlanAction {
    return {
      type: DienstPlanActions.PLAN_UPDATED,
      payload: {plan}
    }
  }

  private createPlanRemovedAction(plan: DienstPlan): IDienstPlanAction {
    return {
      type: DienstPlanActions.PLAN_REMOVED,
      payload: {plan}
    }
  }

  private createPlanSelectedAction(plan: DienstPlan): IDienstPlanAction {
    return {
      type: DienstPlanActions.PLAN_SELECTED,
      payload: {plan}
    }
  }

  private createPlanLoadedAction(planList: List<DienstPlan>): IDienstPlanAction {
    return {
      type: DienstPlanActions.PLAN_LOADED,
      payload: {planList}
    }
  }

  private createPlanCommErrorAction(error: string): IDienstPlanAction {
    return {
      type: DienstPlanActions.PLAN_COM_ERROR,
      payload: null,
      error
    }
  }

}
