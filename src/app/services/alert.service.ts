import {Injectable, ErrorHandler} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class AlertService implements ErrorHandler {


    private errorSubject: Subject<any> = new Subject<any>();
    public errors: Observable<any> = this.errorSubject.asObservable();

    constructor() {

    }


    /**
     * Handlers errors occured by requests
     * @param error error object
     * @return {ErrorObservable}
     */
    public handleHttpError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
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

    handleError(error: any): void {
        let errorItem = {
            type: 'HTTP',
            errMsg: JSON.stringify(error),
            error,
            timestamp: new Date()
        };
        this.errorSubject.next(errorItem);
    }


    /**
     * Handlers errors occured by custom actions
     * @param errMsg error object
     * @param model action model
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

    /**
     * Handlers errors occured by custom actions
     * @param errMsg error object
     * @return {ErrorObservable}
     */
    public showNotification(errMsg: string) {
        this.errorSubject.next({
            type: 'NOTIFICATION',
            errMsg,
            error: null,
            timestamp: new Date()
        });
    }

}
