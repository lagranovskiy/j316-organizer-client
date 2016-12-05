import {Injectable} from '@angular/core';
import {Participant} from "./model/Participant";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {PostalAddress} from "./model/PostalAddress";

@Injectable()
export class AddressPersistenceService {

  constructor(private http:Http) {
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
      .catch(this.handleError);
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
      .catch(this.handleError);
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
      .catch(this.handleError);
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
