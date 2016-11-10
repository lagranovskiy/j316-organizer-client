import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {PostalAddress} from "./PostalAddress";


export class Participant extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uuid: '',

    forename: '',
    surname: '',
    gender: 'male',
    dob: '',

    address: new PostalAddress(),

    mobilePhone: '',
    phone1: '',
    email: '',
    comment: '',
    notificationEmail: true,
    notificationSMS: false,
    notificationCal: true
  }) {
    super(data);

    if (data.address) {
      this.data.address = new PostalAddress(data.address);
    } else {
      this.data.address = new PostalAddress();
    }
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

  get gender(): string {
    return this.data.gender;
  }

  set gender(gender: string) {
    this.data.gender = gender;
  }


  get dob(): string {
    return this.data.dob;
  }

  set dob(dob: string) {
    this.data.dob = dob;
  }

  get address(): PostalAddress {
    return this.data.address;
  }

  set address(address: PostalAddress) {
    this.data.address = address;
  }

  get phone1(): string {
    return this.data.phone1;
  }

  set phone1(phone1: string) {
    this.data.phone1 = phone1;
  }

  get mobilePhone(): string {
    return this.data.mobilePhone;
  }

  set mobilePhone(mobilePhone: string) {
    this.data.mobilePhone = mobilePhone;
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
