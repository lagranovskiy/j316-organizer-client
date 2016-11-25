import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {ParticipantRef} from "../../model/ParticipantRef";
import {Participant} from "../../model/Participant";
import {select} from "ng2-redux";
import {Observable} from "rxjs";
import {List} from "immutable";

@Component({
  selector: 'participant-ref-list-view',
  templateUrl: './participant-ref-list-view.component.html',
  styleUrls: ['./participant-ref-list-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantRefListViewComponent implements OnInit {

  @Input()
  private participants: Array<ParticipantRef> = [];

  @Input()
  private personList:Array<Participant> =[];




  getRelatedParticipant(rel: ParticipantRef): Participant {
    if (!this.personList) {
      return null;
    }
    let result = this.personList.filter((person)=>person.uuid == rel.participantUUID);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }

  ngOnInit() {
  }

}
