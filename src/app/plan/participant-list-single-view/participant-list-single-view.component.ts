import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {Participant} from "../../model/Participant";

@Component({
  selector: 'participant-list-single-view',
  templateUrl: './participant-list-single-view.component.html',
  styleUrls: ['./participant-list-single-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantListSingleViewComponent implements OnInit {

  @Input()
  private participant: Participant;

  constructor() {
  }

  ngOnInit() {
  }

}
