import {Map, List} from "immutable";
import {IDienstPlanAction, DienstPlanActions} from "../actions/DienstPlanActions";
import {DienstPlan} from "../model/DienstPlan";

const INITIAL_STATE = Map<string,any>({
  selectedPlan: new DienstPlan(),
  planList: List<DienstPlan>(),
  editingGroups: List<string>()
});

export function DienstPlanReducer(state: Map<string, any> = INITIAL_STATE, action: IDienstPlanAction) {
  switch (action.type) {

    case DienstPlanActions.TOGGLE_GROUP_EDIT: {
      return state.update('editingGroups', (editingGroupArray: List<string>)=> {
        let index = editingGroupArray.indexOf(action.payload.group.uuid);
        if (index > -1) {
          return editingGroupArray.push(action.payload.group.uuid)
        } else {
          return editingGroupArray.splice(index, 1);
        }
      });
    }

    case DienstPlanActions.PLAN_UPDATED: {
      let listDienstPlan: List<DienstPlan> = state.get('planList');
      let planIndex = listDienstPlan.findIndex((plan: DienstPlan)=>plan.uuid == action.payload.plan.uuid);

      if (planIndex == -1) {
        state = state.setIn(['planList'], listDienstPlan.push(action.payload.plan));
      } else {
        listDienstPlan = listDienstPlan.update(planIndex, () => action.payload.plan);
        state = state.setIn(['planList'], listDienstPlan);
      }

      state = state.setIn(['selectedPlan'], action.payload.plan);

      return state;
    }


    case DienstPlanActions.PLAN_REMOVED: {
      let listDienstPlan: List<DienstPlan> = state.get('planList');
      let planIndex = listDienstPlan.findIndex((plan: DienstPlan)=>plan.uuid == action.payload.plan.uuid);

      if (planIndex > -1) {
        listDienstPlan = listDienstPlan.remove(planIndex);
        state = state.setIn(['planList'], listDienstPlan);
      }

      return state;
    }

    case DienstPlanActions.PLAN_SELECTED: {
      return state.set('selectedPlan', action.payload.plan);
    }


    case DienstPlanActions.PLAN_LOADED:
      return state.set('planList', action.payload.planList);

    case DienstPlanActions.PLAN_COM_ERROR:
      return state;
    default:
      return state;
  }
}
