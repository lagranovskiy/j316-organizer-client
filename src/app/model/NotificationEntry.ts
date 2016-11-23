import * as moment from "moment";

export class NotificationEntry {


  private data: {
    _id: string,
    scheduledDate: string,
    subject: string,
    message: string,
    /* Person UUID */
    referenceId: string,
    isConfirmed: boolean,
    isSent: boolean,
    status: string,
    category: Array<string>,
    notificationType: string,
    eventData: {
      location: string,
      eventStart: string,
      eventEnd: string
    },
    recipient: {
      name: string,
      email: string,
      mobile: string
    }};

  constructor(data: {
    _id: string,
    scheduledDate: string,
    subject: string,
    message: string,
    /* Person UUID */
    referenceId: string,
    isConfirmed: boolean,
    isSent: boolean,
    status: string,
    category: Array<string>,
    notificationType: string,
    eventData: {
      location: string,
      eventStart: string,
      eventEnd: string
    },
    recipient: {
      name: string,
      email: string,
      mobile: string
    },
    createdDate: string
  }) {

    this.data = data;
  }

  get uuid(): string {
    return this.data._id;
  }

  get scheduledDate(): string {
    return moment(this.data.scheduledDate).format('DD.MM.YYYY');
  }

  get isSent(): boolean {
    return this.data.isSent;
  }

  get isConfirmed(): boolean {
    return this.data.isConfirmed;
  }

  get status(): string {
    return this.data.status;
  }

  get recipient(): string {
    return this.data.recipient.name;
  }

  get recipientUUID(): string {
    return this.data.referenceId;
  }

  get category(): Array<string> {
    return this.data.category;
  }

  get notificationType(): string {
    return this.data.notificationType;
  }


}
