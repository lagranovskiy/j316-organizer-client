import {J316Model} from "./J316Model";


export class ParticipantRef extends J316Model {

  constructor(data: any = {
    uuid: '',
    participantUUID: ''
  }) {
    super(data);
  }


  get participantUUID() {
    return this.getKey('participantUUID');
  }

  public setParticipantUUID(value): ParticipantRef {
    return this.setKey<ParticipantRef>(ParticipantRef, 'participantUUID', value);
  }


}
