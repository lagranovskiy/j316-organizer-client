import {J316Model} from "./J316Model";
import {ParticipantRef} from "./ParticipantRef";


export class DienstPlanTeilgruppe extends J316Model {

  constructor(data: any = {
    uid: '',
    participants: [],
    besetzung: []
  }) {
    super(data);
    if (data.sections) {
      this.data.participants = this.data.participants.map(participant=> new ParticipantRef(participant.data));
    }
  }

  get participants(): Array<ParticipantRef> {
    return this.data.participants;
  }

  set participantsArray(refList: Array<string>) {
    this.data.participants = [];
    this.data.participants = refList.map(refId => new ParticipantRef({participantUID: refId}));
  }

  get besetzung(): Array<boolean> {
    return this.data.besetzung;
  }

}
