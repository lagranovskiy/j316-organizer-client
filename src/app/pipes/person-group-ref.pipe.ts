import {Pipe, PipeTransform} from "@angular/core";
import {Participant} from "../model/Participant";
import {List} from "immutable";
import {AppStoreService} from "../services/app-store.service";
import {ParticipantRef} from "../model/ParticipantRef";

@Pipe({
  name: 'PersonGroupRef',
  pure: true
})
export class PersonGroupRefPipe implements PipeTransform {

  private personList: List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  transform(values: Array<Array<ParticipantRef>>): any {
    let retVal: Array<Array<Participant> > = [];
    values.forEach(personRefGroup=> {
      let groupValues = List<Participant>();
      personRefGroup.forEach(personRef=> {
        let result = this.personList.filter((person)=>person.uuid == personRef.participantUUID);
        groupValues = groupValues.push(result.first());
      });
      retVal.push(groupValues.toArray());
    });

    return retVal;
  }

}
