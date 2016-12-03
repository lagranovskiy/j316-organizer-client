import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router";
import { DienstPlan } from '../../model/DienstPlan';
import { DienstPlanGruppe } from '../../model/DienstPlanGruppe';
import { DienstPlanTeilgruppe } from '../../model/DienstPlanTeilgruppe';
import { Participant } from '../../model/Participant';
import { ParticipantRef } from '../../model/ParticipantRef';
import {ParticipantPersistenceService} from "../../services/participant-persistence.service";
import {PlanPersistenceService} from "../../services/plan-persistence.service";

@Component({
  selector: 'app-plan-print',
  templateUrl: './plan-print.component.html',
  styleUrls: ['./plan-print.component.css']
})
export class PlanPrintComponent implements OnInit {
  abstract;

  private plan: DienstPlan = new DienstPlan();
  private paramsSub;
  private personList : Array<Participant> = [];
  private text: string;
  private vers: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: PlanPersistenceService,
              private personService: ParticipantPersistenceService) {
    personService.fetchParticipants().subscribe(list => this.personList = list);
console.log('MyList '+this.personList.length);
    this.text = 'Jeden Freitag: Fasten für den Dienst';
    this.vers = 'Denn aus Gnade seid ihr errettet durch den Glauben, und das nicht aus euch - Gottes Gabe ist es; nicht aus Werken, damit niemand sich rühme. (Epheser 2.8-9)';
  }


  getRelatedParticipant(rel: ParticipantRef): any {
    let result = this.personList.filter((person)=>person.uuid==rel.participantUUID);
    if(result.length>0){
      return result[0];
    }
    return null;
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let planUUID = params["uuid"];

      if (planUUID) {
        this.service.fetchPlan(planUUID).subscribe(plan=> {
          this.plan = plan
        });
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  isNotAvailable(index: number, list: boolean[]): boolean {
    return list[index] == null ? true : false;
  }


}

