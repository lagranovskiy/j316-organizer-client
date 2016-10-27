import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {DisplayableModel} from "../model/DisplayableModel";

@Component({
  selector: 'view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  @Input()
  private model: DisplayableModel;

  @Input()
  private clonable: boolean;

  @Output()
  private openClicked: EventEmitter<DisplayableModel> = new EventEmitter();

  @Output()
  private removeClicked: EventEmitter<DisplayableModel> = new EventEmitter();

  @Output()
  private cloneClicked: EventEmitter<DisplayableModel> = new EventEmitter();

  constructor() {
  }

  sendRemoveEvent(){
    this.removeClicked.emit(this.model);
  }

  sendOpenEvent(){
    this.openClicked.emit(this.model);
  }

  sendCloneEvent(){
    this.cloneClicked.emit(this.model);
  }

  ngOnInit() {
  }

}
