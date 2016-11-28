import {combineReducers} from "redux";
import {PersonReducer} from "./PersonReducer";
import {Map} from "immutable";
import {DienstPlanReducer} from "./DienstPlanReducer";

export interface IAppState {
  person?: Map<string,any>;
  dienstPlan?: Map<string,any>;
}


export const rootReducer = combineReducers<IAppState>({
  person: PersonReducer,
  dienstPlan: DienstPlanReducer
});

export const enhancers = [];
