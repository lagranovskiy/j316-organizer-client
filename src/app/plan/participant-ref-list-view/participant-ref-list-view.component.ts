import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {ParticipantRef} from "../../model/ParticipantRef";
import {Participant} from "../../model/Participant";

@Component({
    selector: 'participant-ref-list-view',
    templateUrl: './participant-ref-list-view.component.html',
    styleUrls: ['./participant-ref-list-view.component.css']
})
export class ParticipantRefListViewComponent implements OnInit {

    @Input()
    private participants: Array<ParticipantRef>;

    @Output()
    private participantRemoved: EventEmitter<string> = new EventEmitter<string>();


    @Input()
    private editMode: boolean = false;

    ngOnInit() {
    }

    removeParticipant(ref: Participant) {
      this.participantRemoved.emit(ref.uuid);
    }

}
