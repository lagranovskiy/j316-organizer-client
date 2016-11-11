import {Component, OnInit, Input} from "@angular/core";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ParticipantRef} from "../../model/ParticipantRef";
import {DienstPlan} from "../../model/DienstPlan";
import {Participant} from "../../model/Participant";
import {Observable} from "rxjs";

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  @Input()
  private plan: DienstPlan;

  private personList : Array<Participant> = [];


  constructor(private personService: ParticipantPersistenceService) {
    personService.fetchParticipants().subscribe(list => this.personList = list);
  }

  getRelatedParticipant(rel: ParticipantRef): any {

    let result = this.personList.filter((person)=>person.uuid==rel.participantUUID);
    if(result.length>0){
      return result[0];
    }
    return null;

   /* class ParticipantResolver {
      private _participant: Participant;

      constructor(private obsParticipant: Observable<Participant>){
        obsParticipant.subscribe((participant => this._participant=participant));
      }

      get participant(){return this._participant};
    }

    return new ParticipantResolver(this.personService.fetchParticipant(rel.participantUUID))*/
  }

  ngOnInit() {
  }

}
