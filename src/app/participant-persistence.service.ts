import {Injectable} from '@angular/core';
import {Participant} from "./model/Participant";

@Injectable()
export class ParticipantPersistenceService {

  constructor() {
    let participantsDummy: Array<Participant> = [];
    participantsDummy.push(new Participant({
      uuid: 'qqaaee1',
      forename: 'Leonid',
      surname: 'Agranovskiy',
      location: 'Max-Plank Uni 12  65820 Bischofsheim am Rhein',
      email: 'test@agranovskiy.de',
      notificationEmail:true,
      notificationSMS: false,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee2',
      forename: 'Max',
      surname: 'Tooms',
      location: 'MAlbert-Plank Uni 12 65820 Kelkheim',
      email: 'test@agranovskiy.de',
      notificationEmail:false,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee3',
      forename: 'Leonid',
      surname: 'Poters',
      location: 'Max-Plank Uni 12',
      email: 'te1st@agranovskiy.de',
      notificationEmail:true,
      notificationSMS: true,
      notificationCal: false
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee4',
      forename: 'Edik',
      surname: 'Nelson',
      location: 'Max-Plank Uni 12',
      email: 'te12st@agranovskiy.de',
      notificationEmail:false,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee5',
      forename: 'Kin',
      surname: 'Kun',
      location: 'Max-Plank 12',
      email: 'tes2t@agranovskiy.de',
      notificationEmail:true,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee6',
      forename: 'Mike',
      surname: 'Mustermann',
      location: 'Max-Plank Uni 12',
      email: 'tes12t@agranovskiy.de',
      notificationEmail:true,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee7',
      forename: 'Daniel',
      surname: 'Makster',
      location: 'Max-Plank Uni 2',
      email: 'te12st@agranovskiy.de',
      notificationEmail:true,
      notificationSMS: true,
      notificationCal: true
    }));

    this.saveParticipantsToStorage(participantsDummy);
  }


  /**
   * Saves given list of plans to the storage
   * @param persons persons
   */
  public saveParticipantsToStorage(persons: Array<Participant>) {
    console.info('Saving current state to the storage');

    let persistentArray: Array<any> = [];

    persons.forEach((person: Participant)=> {
      persistentArray.push(person.getData());
    });

    localStorage.setItem('j316-persons', JSON.stringify(persistentArray));

    return persistentArray;
  }


  /**
   * Fetches a list of persistent dienstplans
   *
   * @returns {DienstPlan[]}
   */
  public fetchParticipantFromStorage() {
    let persistentInfo = localStorage.getItem('j316-persons');

    if (persistentInfo == null || persistentInfo === '') {
      return [];
    }

    let retVal: Array<Participant> = [];

    let planArray = JSON.parse(persistentInfo) as Array<any>;
    planArray.forEach((value) => {
      retVal.push(new Participant(value));
    });

    return retVal
  }

  /**
   * Fetches a plan information by the given uid
   *
   * @param uuid
   */
  public fetchParticipantById(uuid: string) {
    let persistentPlans = this.fetchParticipantFromStorage();
    let retVal = persistentPlans.filter((participant: Participant)=> {
      return participant.uuid === uuid
    });

    if (retVal.length > 1) {
      console.error('Illegal state.. multiple participants with same uid');
    }

    if (retVal.length == 0) {
      console.info('No Participant with give UID found');
      return null;
    }

    return retVal[0];
  }

}
