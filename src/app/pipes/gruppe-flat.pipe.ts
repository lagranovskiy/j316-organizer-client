import {Pipe, PipeTransform} from "@angular/core";
import {DienstPlanGruppe} from "../model/DienstPlanGruppe";
import {ParticipantRef} from "../model/ParticipantRef";

@Pipe({
  name: 'GruppeFlat'
})
export class GruppeFlatPipe implements PipeTransform {

  transform(values: Array<DienstPlanGruppe>, args?: any): any {
    let retVal: Array<Array<ParticipantRef>> = [];
    if (!values) {
      return retVal;
    }
    values.forEach((gruppe: DienstPlanGruppe)=> {
      let groupMarkers = [];
      gruppe.sections.forEach(teilgruppe =>groupMarkers = groupMarkers.concat(teilgruppe.participants));
      retVal.push(groupMarkers);
    });

    return retVal;
  }

}
