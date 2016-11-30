import {Component, OnInit, Input} from "@angular/core";
import {ParticipantRef} from "../../model/ParticipantRef";

@Component({
  selector: 'participant-ref-list-view',
  templateUrl: './participant-ref-list-view.component.html',
  styleUrls: ['./participant-ref-list-view.component.css']
})
export class ParticipantRefListViewComponent implements OnInit {

  @Input()
  private participants: Array<ParticipantRef>;


  ngOnInit() {
  }

}
