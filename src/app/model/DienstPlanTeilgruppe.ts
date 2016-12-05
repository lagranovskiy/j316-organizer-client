import {J316Model} from "./J316Model";
import {ParticipantRef} from "./ParticipantRef";


export class DienstPlanTeilgruppe extends J316Model {

  constructor(data: any = {
    uuid: '',
    participants: [],
    besetzung: [],
    verfuegbarkeit: []
  }) {
    super(data);
    if (this.data.participants) {
      this.data.participants = this.data.participants.map(participant=> new ParticipantRef(participant));
    }
  }

  get participants(): Array<ParticipantRef> {
    return this.data.participants;
  }


  set participants(newArray: Array<ParticipantRef>) {
    this.data.participants = newArray;
  }


  getData(): any {
    var retVal = super.getData();

    var participantList: Array<any> = [];

    this.data.participants.map(function (participantRef) {
      participantList.push(participantRef.getData())
    });

    // No serialization needed, whole object will be json serialized one level higher
    retVal.participants = participantList;
    return retVal;
  }

  get besetzung(): Array<boolean> {
    return this.data.besetzung;
  }

  get verfuegbarkeit(): Array<boolean> {
    if (!this.data.verfuegbarkeit) {
      this.data.verfuegbarkeit = []
    }
    return this.data.verfuegbarkeit;
  }
}
