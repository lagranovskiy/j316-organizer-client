import {Injectable} from "@angular/core";
import {Participant} from "./model/Participant";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {PostalAddress} from "./model/PostalAddress";
import {AddressPersistenceService} from "./address-persistence.service";

@Injectable()
export class ParticipantPersistenceService {

  constructor(private http: Http, private addressService: AddressPersistenceService) {
    let participantsDummy: Array<Participant> = [];
    participantsDummy.push(new Participant({
      uuid: 'qqaaee1',
      forename: 'Leonid',
      surname: 'Agranovskiy',
      location: 'Max-Plank Uni 12  65820 Bischofsheim am Rhein',
      email: 'test@agranovskiy.de',
      notificationEmail: true,
      notificationSMS: false,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee2',
      forename: 'Max',
      surname: 'Tooms',
      location: 'MAlbert-Plank Uni 12 65820 Kelkheim',
      email: 'test@agranovskiy.de',
      notificationEmail: false,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee3',
      forename: 'Leonid',
      surname: 'Poters',
      location: 'Max-Plank Uni 12',
      email: 'te1st@agranovskiy.de',
      notificationEmail: true,
      notificationSMS: true,
      notificationCal: false
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee4',
      forename: 'Edik',
      surname: 'Nelson',
      location: 'Max-Plank Uni 12',
      email: 'te12st@agranovskiy.de',
      notificationEmail: false,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee5',
      forename: 'Kin',
      surname: 'Kun',
      location: 'Max-Plank 12',
      email: 'tes2t@agranovskiy.de',
      notificationEmail: true,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee6',
      forename: 'Mike',
      surname: 'Mustermann',
      location: 'Max-Plank Uni 12',
      email: 'tes12t@agranovskiy.de',
      notificationEmail: true,
      notificationSMS: true,
      notificationCal: true
    }));
    participantsDummy.push(new Participant({
      uuid: 'qqaaee7',
      forename: 'Daniel',
      surname: 'Makster',
      location: 'Max-Plank Uni 2',
      email: 'te12st@agranovskiy.de',
      notificationEmail: true,
      notificationSMS: true,
      notificationCal: true
    }));

    this.saveParticipantsToStorage(participantsDummy);
  }

  /**
   * Fetches all participants from server
   */
  public fetchParticipants(): Observable<Participant[]> {
    return this.http.get('/api/person')
      .map(data => {
          let body = data.json();
          let retVal: Participant[] = [];
          body.map(planData => retVal.push(new Participant(planData)));
          return retVal;
        }
      )
      .catch(this.handleError);
  }

  /**
   * Fetches all participant from server
   */
  public fetchParticipant(uuid: string): Observable<Participant> {
    return this.http.get(`/api/person/${uuid}`)
      .map(data => {
        let resolvedParticipant = new Participant(data.json());

        return resolvedParticipant;
      })
      .flatMap((participant: Participant)=>this.http.get(`/api/person/${participant.uuid}/address`)
        .map((addressArrayData: Response) => {
          let addressDataList = addressArrayData.json();
          if (addressDataList.length > 0) {
            if (addressDataList.length > 1) {
              console.error('More then one address configured for participant. Actually not supported. We take the first one');
            }

            participant.address = new PostalAddress(addressDataList[0].ref);
          }
          return participant;
        })
        .catch(this.handleError))
      .catch(this.handleError);
  }

  /**
   * Fetches all participant from server
   */
  public removeParticipant(uuid: string): Observable<Participant> {
    return this.http.delete(`/api/person/${uuid}`)
      .map(data => {
          return new Participant(data.json());
        }
      )
      .catch(this.handleError);
  }

  /**
   * Saves a given participant
   * @param participant participant to be saved
   * @return {Observable<R>}
   */
  public saveParticipant(participant: Participant): Observable<Participant> {
    let data = participant.getData();

    return Observable.forkJoin(
      this.addressService.savePostalAddress(participant.address),
      this.http.put('/api/person', data).map(data => new Participant(data.json()))
    ).flatMap((persistentSet: [PostalAddress, Participant])=> {
      let savedPerson: Participant = persistentSet[1];
      let savedAddress: PostalAddress = persistentSet[0];


     return this.http.put(`/api/person/${savedPerson.uuid}/address/`, {relationUUID: savedAddress.uuid, ref: savedAddress.getData()}).map(() => {
        savedPerson.address = savedAddress;
        return savedPerson;
      });

    })
      .catch(this.handleError);

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


  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
