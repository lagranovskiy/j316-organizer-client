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

    let errorItem = {
      type: 'HTTP',
      errMsg,
      error,
      timestamp: new Date()
    };
    this.errorSubject.next(errorItem);

    return Observable.throw(errMsg);
  }


  /**
   * Handlers errors occured by custom actions
   * @param error error object
   * @param action action text
   * @return {ErrorObservable}
   */
  public handleCustomError(errMsg: string, model: any = null) {
    this.errorSubject.next({
      type: 'CUSTOM',
      errMsg,
      error: model,
      timestamp: new Date()
    });
  }

}
