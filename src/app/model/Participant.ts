import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";


export class Participant extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uid: '',

    forename: '',
    surname: '',

    location: '',
    phone: '',
    email: '',
    comment: '',
    notificationEmail: true,
    notificationSMS: false,
    notificationCal: true
  }) {
    super(data);
  }


  get notificationEmail(): boolean {
    return this.data.notificationEmail
  }

  set notificationEmail(notification: boolean) {
    this.data.notificationEmail = notification;
  }


  get notificationSMS(): boolean {
    return this.data.notificationSMS
  }

  set notificationSMS(notification: boolean) {
    this.data.notificationSMS = notification;
  }


  get notificationCal(): boolean {
    return this.data.notificationCal
  }

  set notificationCal(notification: boolean) {
    this.data.notificationCal = notification;
  }


  get forename(): string {
    return this.data.forename;
  }

  set forename(forename: string) {
    this.data.forename = forename;
  }

  get surname(): string {
    return this.data.surname;
  }

  set surname(surname: string) {
    this.data.surname = surname;
  }

  get location(): string {
    return this.data.location;
  }

  set location(location: string) {
    this.data.location = location;
  }

  get phone(): string {
    return this.data.phone;
  }

  set phone(phone: string) {
    this.data.phone = phone;
  }

  get email(): string {
    return this.data.email;
  }

  set email(email: string) {
    this.data.email = email;
  }

  get comment(): string {
    return this.data.comment;
  }

  set comment(comment: string) {
    this.data.comment = comment;
  }

  getTitle() {
    return this.forename + ' ' + this.surname;
  }

  getDescription() {
    return this.data.comment;
  }

}
