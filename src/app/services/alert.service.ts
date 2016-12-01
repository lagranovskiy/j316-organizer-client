import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class AlertService {

  private errorSubject: Subject<any> = new Subject<any>();
  public errors: Observable<any> = this.errorSubject.asObservable();

  constructor() {
  }


  /**
   * Handlers errors occured by requests
   * @param error error object
   * @param action action text
   * @return {ErrorObservable}
   */
  public handleHttpError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.toString();
    }

    this.errorSubject.next(errMsg);

    return Observable.throw(errMsg);
  }


  /**
   * Handlers errors occured by requests
   * @param error error object
   * @param action action text
   * @return {ErrorObservable}
   */
  public handleCustomError(error: string) {
    this.errorSubject.next(error);
  }

}
