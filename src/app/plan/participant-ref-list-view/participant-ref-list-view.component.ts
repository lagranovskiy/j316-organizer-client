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


    @Input()
    private editMode: boolean = false;

    ngOnInit() {
    }

    removeParticipant(uuid: string) {
        let ref = this.participants.filter(item=>item.participantUUID === uuid)[0];
        this.participants.splice(this.participants.indexOf(ref), 1);
        console.error('removing participant from teilgruppe')
    }

}
