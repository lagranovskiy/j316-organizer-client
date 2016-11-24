import {PersonListActions} from "../actions/PersonListActions";
import {Participant} from "../model/Participant";
import {List} from "immutable";

const INITIAL_STATE: List<Participant> = new List<Participant>();

export function PersonListReducer(state: List<Participant> = INITIAL_STATE, action: any) {
  switch (action.type) {
    case PersonListActions.INCREMENT_COUNTER:
      return state.asImmutable();
    case PersonListActions.DECREMENT_COUNTER:
      return state.asImmutable();
    case PersonListActions.RANDOMIZE_COUNTER:
      return state.asImmutable();
    default:
      return state.asImmutable();
  }
}
