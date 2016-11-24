import {Injectable} from "@angular/core";
import {NgRedux} from "ng2-redux";
import {IAppState} from "../app.module";
import {ParticipantPersistenceService} from "../participant-persistence.service";
import {Participant} from "../model/Participant";

/**
 * Action creators in Angular 2. We may as well adopt a more
 * class-based approach to satisfy Angular 2's OOP idiom. It
 * has the advantage of letting us use the dependency injector
 * as a replacement for redux-thunk.
 */
@Injectable()
export class PersonListActions {
  constructor(private ngRedux: NgRedux<IAppState>,
              private participantService: ParticipantPersistenceService) {
  }

  static INCREMENT_COUNTER: string = 'INCREMENT_COUNTER';
  static DECREMENT_COUNTER: string = 'DECREMENT_COUNTER';
  static RANDOMIZE_COUNTER: string = 'RANDOMIZE_COUNTER';

  savePerson(participant: Participant) {
    this.ngRedux.dispatch({type: PersonListActions.RANDOMIZE_COUNTER})
    this.participantService.saveParticipant(participant).subscribe(savedParticipant=> {
      this.ngRedux.dispatch({
        type: 'PERSON_SAVED',
        payload: savedParticipant
      }).catch(err=> {
        this.ngRedux.dispatch({
          type: 'PERSON_SAVING_ERROR',
          payload: err
        });
      })
    })
  }

  removePerson(participant: Participant) {

  }

}
