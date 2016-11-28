import {DienstPlanGruppe} from "./DienstPlanGruppe";
import {PostalAddress} from "./PostalAddress";
import {DienstPlanTeilgruppeData, DienstPlanTeilgruppe} from "./DienstPlanTeilgruppe";
import {ParticipantRef} from "./ParticipantRef";
import {DienstPlan} from "./DienstPlan";

export class DienstPlanFactory {

  static createDienstPlan(dienstPlanData: any) {

    if (dienstPlanData.planJSON) {
      let parsedGroupList = JSON.parse(dienstPlanData.planJSON);

      // Iterate over group JSON's
      dienstPlanData.groupList = parsedGroupList.map(group=> DienstPlanFactory.createDienstPlanGruppe(group));
    }

    return new DienstPlan(dienstPlanData);
  }


  static createDienstPlanGruppe(groupData: any) {
    // Create Address model for address json
    groupData.address = new PostalAddress(groupData.address);

    // Create Dienstplan Gruppen and Teilgruppen
    let groupSectionArray = [];
    groupData.sections.forEach(sectionData=> groupSectionArray.push(DienstPlanFactory.createDienstPlanTeilgruppe(sectionData)));
    groupData.sections = groupSectionArray;
    return new DienstPlanGruppe(groupData);
  }

  static createDienstPlanTeilgruppe(sectionData: any) {

    let participantsArray = [];
    sectionData.participants.forEach(partData=> {
      participantsArray.push(new ParticipantRef(partData));
    });

    sectionData.participants = participantsArray;
    return new DienstPlanTeilgruppe(<DienstPlanTeilgruppeData>sectionData)

  }


  static createParticipantRef(participantRefData: any) {
    return new ParticipantRef(participantRefData);
  }

}
