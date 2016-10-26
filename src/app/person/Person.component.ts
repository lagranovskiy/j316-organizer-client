import {Component, OnInit, EventEmitter} from "@angular/core";
import {PersonActions} from "../actions/PersonActions";
import {AppStore} from "angular2-redux-util";
import {PersonModel} from "../model/PersonModel";
import {Input, Output} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'person',
  template: `
                  <div class="col s6">
                    {{person.name}} {{person.surname}}
                  </div>
                  <div class="col s2">
                    <button md-icon-button (click)="onDeletePressed()">
                      <md-icon class="md-12">delete</md-icon>
                    </button>
                  </div>
                  <div class="col s2">
                    <button md-icon-button (click)="onSavePressed()">
                      <md-icon class="md-12">done</md-icon>
                    </button>
                  </div>
`
})
export class PersonComponent implements OnInit {

  @Input('person')
  person: PersonModel;

  @Output()
  personDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  personUpdated: EventEmitter<any> = new EventEmitter();


  onDeletePressed() {
    this.personDeleted.emit(this.person);
  }

  onSavePressed() {
    this.personUpdated.emit(this.person);
  }

  constructor() {

  }


  ngOnInit() {
  }

}
