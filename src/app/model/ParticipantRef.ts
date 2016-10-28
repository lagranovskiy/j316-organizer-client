import {J316Model} from "./J316Model";


export class ParticipantRef extends J316Model {

  constructor(data: any = {
    uid: '',
    participantUID: ''
  }) {
    super(data);
  }


  get participantUID() {
    return this.data.participantUID;
  }


  set participantUID(participantUID: string) {
    this.data.participantUID = participantUID;
  }


}
