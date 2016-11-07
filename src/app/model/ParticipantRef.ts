import {J316Model} from "./J316Model";


export class ParticipantRef extends J316Model {

  constructor(data: any = {
    uuid: '',
    participantUUID: ''
  }) {
    super(data);
  }


  get participantUUID() {
    return this.data.participantUUID;
  }


  set participantUID(participantUUID: string) {
    this.data.participantUUID = participantUUID;
  }


}
