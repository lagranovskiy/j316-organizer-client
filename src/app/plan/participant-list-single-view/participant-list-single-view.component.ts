import {Component, OnInit, Input} from '@angular/core';
import {Participant} from "../../model/Participant";

@Component({
  selector: 'participant-list-single-view',
  templateUrl: './participant-list-single-view.component.html',
  styleUrls: ['./participant-list-single-view.component.css']
})
export class ParticipantListSingleViewComponent implements OnInit {

  @Input()
  private participant: Participant;

  constructor() {
  }

  ngOnInit() {
  }

}
