import *  as PersonActions from "../actions/PersonActions";
import {PersonModel} from "../model/PersonModel";
import {List} from "immutable";


export interface IPersonAction {
    type: string;
    person: PersonModel;
}

export default (state: List<PersonModel> = List<PersonModel>(), action: IPersonAction): List<PersonModel> => {
    switch (action.type) {

        case PersonActions.ADD_PERSON_ACTION:
            var personList: List<PersonModel> = List(state);
            personList = personList.push(action.person);
            return personList;

        case PersonActions.REMOVE_PERSON_ACTION:
            var personList: List<PersonModel> = List(state);
            personList = personList.remove(personList.indexOf(action.person));
            return personList;

        default:
            return state;
    }
}
