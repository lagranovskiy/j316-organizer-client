import {Component, OnInit, EventEmitter} from "@angular/core";
import {AlertService} from "../../services/alert.service";
import {MaterializeAction, toast} from "angular2-materialize";

@Component({
  selector: 'alert-listener',
  templateUrl: './alert-listener.component.html',
  styleUrls: ['./alert-listener.component.css']
})
export class AlertListenerComponent implements OnInit {

  private errorsList: Array<{error: string,timestamp: Date}> = [];

  private modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private service: AlertService) {
    service.errors.subscribe(errorItem => {
      /*
       let errorItem = {
       type: 'HTTP',
       errMsg,
       error,
       timestamp: new Date()
       };
       */

      this.errorsList.unshift(errorItem)
      this.showError();
    });
  }

  stringify(error) {
    return JSON.stringify(error, null, 4);
  }

  private clearErrors() {
    this.errorsList = [];
  }

  showError() {
    toast(this.errorsList[0].error, 4000)
  }

  showErrorWindow() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }


  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }

  ngOnInit() {
  }

}
