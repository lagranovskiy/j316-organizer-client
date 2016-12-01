import {Component, OnInit, EventEmitter} from "@angular/core";
import {AlertService} from "../../services/alert.service";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'alert-listener',
  templateUrl: './alert-listener.component.html',
  styleUrls: ['./alert-listener.component.css']
})
export class AlertListenerComponent implements OnInit {

  private errorsList: Array<{error: string,timestamp: Date}> = [];

  private modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private service: AlertService) {
    service.errors.subscribe(error => {
      let protokollEntry = {
        error,
        timestamp: new Date()
      };
      this.errorsList.unshift(protokollEntry)
      this.showError();
    });
  }

  private clearErrors() {
    this.errorsList = [];
  }

  showError() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }


  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }

  ngOnInit() {
  }

}
