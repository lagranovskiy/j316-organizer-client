import {Pipe, PipeTransform} from "@angular/core";
import {DienstPlanTeilgruppe} from "./model/DienstPlanTeilgruppe";
import {ParticipantRef} from "./model/ParticipantRef";

@Pipe({
  name: 'participantFlat'
})
export class ParticipantFlatPipe implements PipeTransform {

  transform(values: Array<DienstPlanTeilgruppe>, args?: any): any {
    let retVal: Array<ParticipantRef> = [];

    values.forEach(teilgruppe =>retVal = retVal.concat(teilgruppe.participants));
    return retVal;
  }

}
