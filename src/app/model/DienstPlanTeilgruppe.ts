import {J316Model} from "./J316Model";
import {ParticipantRef} from "./ParticipantRef";
import {List} from "immutable";

export interface DienstPlanTeilgruppeData {
  uuid: string,
  participants: Array<ParticipantRef>,
  besetzung: Array<boolean>,
  verfuegbarkeit: Array<boolean>
}

export class DienstPlanTeilgruppe extends J316Model {

  //private participantArray: Array<string> = [];

  constructor(data: DienstPlanTeilgruppeData = {
    uuid: '',
    participants: [],
    // Some part group is on turn
    besetzung: [],
    // Indicates that part group can be on turn on given date
    verfuegbarkeit: []
  }) {
    if (data.participants) {
      // TODO: Move the mutable state to the component
      // Workaround for multiselect initialization
      //this.participantArray = data.participants.map(participant=> participant.participantUUID);
      data.participants = data.participants.map(participant=> new ParticipantRef(participant));
    }
    super(data);
  }

  get participants(): List<ParticipantRef> {
    return this.getKey('participants');
  }

  /**
   * Indicates the partgroup is on turn on the given date
   * @return {any}
   */
  get besetzung(): Array<boolean> {
    return this.getKey('besetzung');
  }

  /**
   * Indicates the partgroup can be on turn on the given date
   * @return {any}
   */
  get verfuegbarkeit(): Array<boolean> {
    return this.getKey('verfuegbarkeit');
  }

  /**
   * This is a wrapper to loose couple participant and dienstplan
   * @returns {(string|any|string)[]}
   */
  get participantsArray(): Array<string> {
    return [];
  }



  set participantsArray(refList: Array<string>) {
    //this.participantArray = refList;
    // TODO: Will not work!!
    // this.data.participants = [];
    //this.data.participants = refList.map(refId => new ParticipantRef({participantUUID: refId}));
  }


  getData(): any {
    var retVal: DienstPlanTeilgruppeData = <DienstPlanTeilgruppeData> super.getData().toObject();

    var participantList: Array<any> = [];

    this.participants.map(function (participantRef) {
      participantList.push(participantRef.getData())
    });

    // No serialization needed, whole object will be json serialized one level higher
    retVal.participants = participantList;
    return retVal;
  }


}
