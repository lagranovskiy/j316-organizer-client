import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PostalAddress} from "../model/PostalAddress";
import {AuthHttp} from "angular2-jwt";
import {AlertService} from "./alert.service";

@Injectable()
export class AddressPersistenceService {

    constructor(private http: AuthHttp, private alertService: AlertService) {
    }

    /**
     * Fetches all PostalAddress from server
     */
    public fetchPostalAddress(uuid: string): Observable<PostalAddress> {
        return this.http.get(`/api/postal/${uuid}`)
            .map(data => {
                    return new PostalAddress(data.json());
                }
            )
            .catch((err)=> this.alertService.handleHttpError(err));
    }

    /**
     * Fetches single PostalAddress from server
     */
    public removePostalAddress(uuid: string): Observable<PostalAddress> {
        return this.http.delete(`/api/postal/${uuid}`)
            .map(data => {
                    return new PostalAddress(data.json());
                }
            )
            .catch((err)=> this.alertService.handleHttpError(err));
    }

    /**
     * Saves a given PostalAddress
     * @param address
     * @return {Observable<PostalAddress>}
     */
    public savePostalAddress(address: PostalAddress): Observable<PostalAddress> {
        let data = address.getData();
        return this.http.put('/api/postal', data)
            .map(data => {
                return new PostalAddress(data.json());
            })
            .catch((err)=> this.alertService.handleHttpError(err));
    }

}
