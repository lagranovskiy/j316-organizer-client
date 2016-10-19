import {Injectable} from "@angular/core";
import {PersonModel} from "../model/PersonModel";
import {Actions, AppStore} from "angular2-redux-util";


export const ADD_PERSON_ACTION: string = 'ADD_PERSON_ACTION';
export const REMOVE_PERSON_ACTION: string = 'REMOVE_PERSON_ACTION';


@Injectable()
export class PersonActions extends Actions {

    constructor(private appStore: AppStore) {
        super();
    }


    /**
     * Removes existing person
     * @param person
     */
    removePerson(person: PersonModel) {
        this.appStore.dispatch({
            type: REMOVE_PERSON_ACTION,
            person
        })
    }

    /**
     * Throws an event that produces a new person
     */
    addNewPerson(personData : Object) {

        let newPerson = new PersonModel(personData);
        this.appStore.dispatch({
            type: ADD_PERSON_ACTION,
            person: newPerson
        })
    }


}
