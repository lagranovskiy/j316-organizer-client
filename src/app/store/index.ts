import {combineReducers} from "redux";
import persons from "../reducers/PersonListReducer";
import {PersonModel} from "../model/PersonModel";

export interface IAppState {
  persons?: Array<PersonModel>[];
  services?: Array<any>[];
  oragnization?: Array<any>[];
};

export const initialState: IAppState = {
  persons: [],
  services: [],
  oragnization: [],
}

export const rootReducer = combineReducers<IAppState>({
  persons: persons
});



export default rootReducer;

