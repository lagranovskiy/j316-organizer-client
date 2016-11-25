import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {ParticipantPersistenceService} from "../participant-persistence.service";
import {Participant} from "../model/Participant";
import {List} from "immutable";
import {IAppState} from "../reducers/index";

export interface IPersonAction {
  type: string;

  payload?: {
    person?: Participant,
    personUUID?: string,
    personList?: List<Participant>
  }

  error?: string;
}

/**
 * Actions on the persons
 */
@Injectable()
export class PersonActions {
  constructor(private ngRedux: NgRedux<IAppState>,
              private participantService: ParticipantPersistenceService) {
  }

  static PERSON_SELECTED: string = 'PERSON_SELECTED';
  static PERSONS_LOADED: string = 'PERSONS_LOADED';
  static PERSON_UPDATED: string = 'PERSON_UPDATED';
  static PERSON_REMOVED: string = 'PERSON_REMOVED';
  static PERSON_COM_ERROR: string = 'PERSON_COM_ERROR';


  loadPersons() {
    this.participantService.fetchParticipants()
      .subscribe(savedParticipant=> this.ngRedux.dispatch(this.createPersonLoadedAction(List<Participant>(savedParticipant))))
  }

  savePerson(participant: Participant) {

    this.participantService.saveParticipant(participant)
      .subscribe(savedParticipant=> this.ngRedux.dispatch(this.createPersonUpdatedAction(savedParticipant)))

  }

  removePerson(participant: Participant) {

    this.participantService.removeParticipant(participant.uuid)
      .subscribe(savedParticipant=> this.ngRedux.dispatch(this.createPersonRemovedAction(savedParticipant)))

  }

  selectPerson(participant: Participant) {
    this.ngRedux.dispatch(this.createPersonSelectedAction(participant));
  }


  private createPersonUpdatedAction(person: Participant): IPersonAction {
    return {
      type: PersonActions.PERSON_UPDATED,
      payload: {person, personUUID: person.uuid}
    }
  }

  private createPersonRemovedAction(person: Participant): IPersonAction {
    return {
      type: PersonActions.PERSON_REMOVED,
      payload: {person, personUUID: person.uuid}
    }
  }

  private createPersonSelectedAction(person: Participant): IPersonAction {
    return {
      type: PersonActions.PERSON_SELECTED,
      payload: {person, personUUID: person.uuid}
    }
  }

  private createPersonLoadedAction(personList: List<Participant>): IPersonAction {
    return {
      type: PersonActions.PERSONS_LOADED,
      payload: {personList}
    }
  }

  private createPersonCommErrorAction(error: string): IPersonAction {
    return {
      type: PersonActions.PERSON_COM_ERROR,
      payload: null,
      error
    }
  }

}
