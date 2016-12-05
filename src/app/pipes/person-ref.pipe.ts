import {Pipe, PipeTransform} from "@angular/core";
import {ParticipantRef} from "../model/ParticipantRef";
import {Participant} from "../model/Participant";
import {List} from "immutable";
import {AppStoreService} from "../services/app-store.service";

@Pipe({
  name: 'personRef',
  pure: false
})
export class PersonRefPipe implements PipeTransform {

  private personList : List<Participant> = List<Participant>();

  constructor(private appStoreService: AppStoreService) {
    appStoreService.personList.subscribe(list => this.personList = list);
  }

  transform(values: Array<ParticipantRef>): any {
    let retVal: Array<Participant> = [];
    values.forEach(personRef=> {
      let result = this.personList.filter((person)=>person.uuid == personRef.participantUUID);
      if (result.size > 0) {
        return retVal.push(result.first());
      }
    });

    return retVal;
  }


}
