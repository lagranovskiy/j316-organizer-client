import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {DienstPlanGruppe} from "../model/DienstPlanGruppe";
import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
  selector: 'gruppe-view',
  templateUrl: './gruppe-view.component.html',
  styleUrls: ['./gruppe-view.component.css']
})
export class GruppeViewComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  @Output()
  private removeClicked: EventEmitter<DienstPlanGruppe> = new EventEmitter<DienstPlanGruppe>();

  private isEditing: boolean = false;

  constructor() {

  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }


  sendRemoveEvent(){
    this.removeClicked.emit(this.model);
  }

  ngOnInit() {
  }

}
