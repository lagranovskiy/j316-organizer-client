import { combineReducers } from 'redux';
import {IAppState} from './IAppState';

export interface IAppState {
  persons?:Array<any> [];
  services?:Array<any> [];
  oragnization?:Array<any> [];
};

export const rootReducerTest = combineReducers<IAppState>({
  /*Here the reducer are comming*/
});
