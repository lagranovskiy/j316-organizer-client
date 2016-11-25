import {PersonActions, IPersonAction} from "../actions/PersonActions";
import {Map, List} from "immutable";
import {Participant} from "../model/Participant";


export function PersonReducer(state: Map<string, any> = Map<string, any>({}), action: IPersonAction) {
  switch (action.type) {

    case PersonActions.PERSON_UPDATED: {
      let personList: List<Participant> = state.get('personList');
      let personIndex = personList.findIndex((person: Participant)=>person.uuid == action.payload.person.uuid);

      if (personIndex == -1) {
        state = state.setIn(['personList'], personList.push(action.payload.person));
      } else {
        personList = personList.update(personIndex, () => action.payload.person);
        state = state.setIn(['personList'], personList);
      }

      return state;
    }


    case PersonActions.PERSON_REMOVED: {
      let personList: List<Participant> = state.get('personList');
      let personIndex = personList.findIndex((person: Participant)=>person.uuid == action.payload.person.uuid);

      if (personIndex > -1) {
        personList = personList.remove(personIndex);
        state = state.setIn(['personList'], personList);
      }

      return state;
    }

    case PersonActions.PERSON_SELECTED:
      return state.set('person', action.payload.person);

    case PersonActions.PERSONS_LOADED:
      return state.set('personList', action.payload.personList);

    case PersonActions.PERSON_COM_ERROR:
      return state;
    default:
      return state;
  }
}
