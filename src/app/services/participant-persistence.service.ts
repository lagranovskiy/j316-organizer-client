import {Injectable} from "@angular/core";
import {Participant} from "../model/Participant";
import {Observable, Subject} from "rxjs";
import {Response} from "@angular/http";
import {PostalAddress} from "../model/PostalAddress";
import {AddressPersistenceService} from "./address-persistence.service";
import {AuthHttp} from "angular2-jwt";
import {AlertService} from "./alert.service";

@Injectable()
export class ParticipantPersistenceService {

    constructor(private http: AuthHttp,
                private alertService: AlertService,
                private addressService: AddressPersistenceService) {
    }

    /**
     * Fetches all participants from server
     */
    public fetchParticipants(): Observable<Participant[]> {

        let retVal = this.http.get('/api/person')
            .map(response => response.json())
            .map(personJSON => personJSON.map(personData => new Participant(personData)))
            .map((participants: Array<Participant>)=> {
                participants.forEach(participant=> {
                    this.http.get(`/api/person/${participant.uuid}/address`)
                        .map((addressArrayData: Response) => {
                            let addressDataList = addressArrayData.json();
                            if (addressDataList.length > 0) {
                                if (addressDataList.length > 1) {
                                    console.error('More then one address configured for participant. Actually not supported. We take the first one');
                                }

                                participant.address = new PostalAddress(addressDataList[0].ref);
                            }
                            return participant;
                        }).subscribe(()=> {
                    }, (err)=> this.alertService.handleHttpError(err));
                });
                return participants;
            })
            .catch((err)=> this.alertService.handleHttpError(err));

        return retVal;
    }

    /**
     * Fetches all participant from server
     */
    public   fetchParticipant(uuid: string): Observable < Participant > {
        return this.http.get(`/api/person/${uuid}`)
            .map(data => new Participant(data.json()))
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
                .catch((err)=> this.alertService.handleHttpError(err)))
            .catch((err)=> this.alertService.handleHttpError(err));
    }

    /**
     * Fetches all participant from server
     */
    public   removeParticipant(uuid: string): Observable < Participant > {
        // TODO: remove the address of person as well as the relation to it
        return this.http.delete(`/api/person/${uuid}`)
            .map(data => {
                    return new Participant(data.json());
                }
            )
            .catch((err)=> this.alertService.handleHttpError(err));
    }

    /**
     * Saves a given participant
     * @param participant participant to be saved
     * @return {Observable<R>}
     */
    public
    saveParticipant(participant: Participant): Observable <Participant> {
        let retVal: Subject<Participant> = new Subject<Participant>();
        let data = participant.getData();

        Observable.forkJoin(
            this.addressService.savePostalAddress(participant.address),
            this.http.put('/api/person', data).map(data => new Participant(data.json()))
        ).flatMap((persistentSet: [PostalAddress, Participant])=> {
            let savedPerson: Participant = persistentSet[1];
            let savedAddress: PostalAddress = persistentSet[0];


            return this.http.put(`/api/person/${savedPerson.uuid}/address/`, {
                relationUUID: savedAddress.uuid,
                ref: savedAddress.getData()
            }).map(() => {
                savedPerson.address = savedAddress;
                return savedPerson;
            });

        }).subscribe(
            success=>retVal.next(success),
            error=> {
                this.alertService.handleHttpError(error);
                return retVal.error(error)
            });

        return retVal.asObservable();
    }


}
