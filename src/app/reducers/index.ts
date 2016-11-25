import {combineReducers} from "redux";
import {PersonReducer} from "./PersonReducer";
import {Map} from "immutable";

export interface IAppState {
  person?: Map<string,any>;
}


export const rootReducer = combineReducers<IAppState>({
  person: PersonReducer
});

export const enhancers = [];
