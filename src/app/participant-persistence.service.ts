import {Injectable} from "@angular/core";
import {Participant} from "./model/Participant";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {PostalAddress} from "./model/PostalAddress";
import {AddressPersistenceService} from "./address-persistence.service";

@Injectable()
export class ParticipantPersistenceService {

  constructor(private http: Http, private addressService: AddressPersistenceService) {
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
      .map(data => new Participant(data.json()))
      .flatMap((participant: Participant)=>this.http.get(`/api/person/${participant.uuid}/address`)
        .map((addressArrayData: Response) => {
          let addressDataList = addressArrayData.json();
          if (addressDataList.length > 0) {
            if (addressDataList.length > 1) {
              console.error('More then one address configured for participant. Actually not supported. We take the first one');
            }

            participant = participant.setField('address', new PostalAddress(addressDataList[0].ref));
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
    // TODO: remove the address of person as well as the relation to it
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


      return this.http.put(`/api/person/${savedPerson.uuid}/address/`, {
        relationUUID: savedAddress.uuid,
        ref: savedAddress.getData()
      }).map(() => {
        savedPerson = savedPerson.setField('address', savedAddress);
        return savedPerson;
      });

    })
      .catch(this.handleError);

  }


  /**
   * Handlers errors occured by requests
   * @param error error object
   * @param action action text
   * @return {ErrorObservable}
   */
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.toString();
    }
    console.error(`Problem occured :: ${errMsg}`);
    return Observable.throw(errMsg);
  }

}
