import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'group',
  template: `
                <div class="row">
                  <div class="col s8">
                    {{groupName}}
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
                </div>
  `
})
export class GroupComponent implements OnInit {

  @Input()
  groupName: string;

  @Output()
  groupDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  groupUpdated: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onSavePressed(value:boolean) {
    this.groupUpdated.emit(this.groupName);
  }

  onDeletePressed(value:boolean) {
    this.groupDeleted.emit(this.groupName);
  }
  ngOnInit() {
  }

}
