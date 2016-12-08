import * as moment from "moment";
import {DisplayableModel} from "./interfaces/DisplayableModel";

export class NotificationEntry implements DisplayableModel{



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
    success: boolean,
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
    }
  };

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
    success: boolean,
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


  getDescription(): string {
    return this.scheduledDate;
  }

  getTitle(): string {
    return this.recipient;
  }

  get uuid(): string {
    return this.data._id;
  }

  get subject(): string {
    return this.data.subject
  }

  get scheduledDateIndexed(): string {
    return moment(this.data.scheduledDate).format('YYYY.MM.DD');
  }

  get scheduledDate(): string {
    return moment(this.data.scheduledDate).format('DD.MM.YYYY');
  }

  /**
   * Shows date difference according to now
   */
  get scheduledDateOrientation(): string {
    return moment(this.data.scheduledDate).fromNow();
  }

  /**
   * Shows if issue is in the past
   */
  get isInPast(): boolean {
    return moment(this.data.scheduledDate).isBefore(new Date());
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

  get success(): boolean {
    return this.data.success;
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
