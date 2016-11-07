import {J316Model} from "./J316Model";
import {ParticipantRef} from "./ParticipantRef";


export class DienstPlanTeilgruppe extends J316Model {

  private participantArray: Array<string> = [];

  constructor(data: any = {
    uuid: '',
    participants: [],
    besetzung: []
  }) {
    super(data);
    if (this.data.participants) {

      // Workaround for multiselect initialization
      this.participantArray = this.data.participants.map(participant=> participant.data.participantUUID);

      this.data.participants = this.data.participants.map(participant=> new ParticipantRef(participant.data));
    }
  }

  get participants(): Array<ParticipantRef> {
    return this.data.participants;
  }

  /**
   * This is a wrapper to loose couple participant and dienstplan
   * @returns {(string|any|string)[]}
   */
  get participantsArray(): Array<string> {

    return this.participantArray;
    //this.data.participants.every(participantRef => retVal.push(participantRef.participantUID));
    //return retVal;
  }

  set participantsArray(refList: Array<string>) {
    this.participantArray = refList;
    this.data.participants = [];
    this.data.participants = refList.map(refId => new ParticipantRef({participantUUID: refId}));
  }

  get besetzung(): Array<boolean> {
    return this.data.besetzung;
  }

}
