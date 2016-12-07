import {Pipe, PipeTransform} from "@angular/core";
import {DienstPlanTeilgruppe} from "../model/DienstPlanTeilgruppe";
import {ParticipantRef} from "../model/ParticipantRef";

@Pipe({
  name: 'participantFlat',
  pure: false
})
export class ParticipantFlatPipe implements PipeTransform {

  transform(values: Array<DienstPlanTeilgruppe>, args?: any): any {
    let retVal: Array<ParticipantRef> = [];
    if (!values) {
      return retVal;
    }
    values.forEach(teilgruppe =>retVal = retVal.concat(teilgruppe.participants));
    return retVal;
  }

}
