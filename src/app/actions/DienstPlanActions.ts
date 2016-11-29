import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {PlanPersistenceService} from "../plan-persistence.service";
import {List} from "immutable";
import {IAppState} from "../reducers/index";
import {DienstPlan} from "../model/DienstPlan";
import {Router} from "@angular/router";
import {DienstPlanGruppe} from "../model/DienstPlanGruppe";
import {DienstPlanTeilgruppe} from "../model/DienstPlanTeilgruppe";

export interface IDienstPlanAction {
  type: string;
  payload?: {
    group?: DienstPlanGruppe,
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

  static TOGGLE_GROUP_EDIT: string = 'TOGGLE_GROUP_EDIT';

  public toggleGroupEditing(gruppe: DienstPlanGruppe) {
    this.ngRedux.dispatch(this.createToggleGroupEdit(gruppe));
  }

  public updatePlanData(plan: DienstPlan, key: string, value: any) {
    plan = plan.setField(key, value);

    // Hook to update event dates if one of the dependent parameters are changed
    if (key == 'planStart' || key == 'planEnd' || key == 'eventRecurringDays') {
      let dates = DienstPlan.generateEventDates(plan.planStart, plan.planEnd, plan.eventRecurringDays)
      plan = plan.setField('eventDates', dates)
    }

    this.ngRedux.dispatch(this.createPlanUpdatedAction(plan));
  }

  public updatePlanDataGroup(updatedGroup: DienstPlanGruppe) {
    let plan: DienstPlan = this.ngRedux.getState().dienstPlan.get('selectedPlan');
    let groupIndex = plan.groupList.findIndex(group=>updatedGroup.uuid === group.uuid);
    let updatedPlan: DienstPlan = plan.setFieldIn(['groupList', groupIndex], old=>updatedGroup);
    this.ngRedux.dispatch(this.createPlanUpdatedAction(updatedPlan));
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
    } else {
      this.ngRedux.dispatch(this.createPlanSelectedAction(plans.first()));
    }
  }

  public selectDienstPlan(plan: DienstPlan) {

    this.ngRedux.dispatch(this.createPlanSelectedAction(plan));
    this.router.navigate([`/plan/${plan.uuid}/edit`]);
  }


  private createToggleGroupEdit(group: DienstPlanGruppe): IDienstPlanAction {
    return {
      type: DienstPlanActions.PLAN_UPDATED,
      payload: {group}
    }
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
