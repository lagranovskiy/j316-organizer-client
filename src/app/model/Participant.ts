import {DisplayableModel} from "./interfaces/DisplayableModel";
import {J316Model} from "./J316Model";
import {PostalAddress} from "./PostalAddress";


export class Participant extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uuid: '',

    forename: '',
    surname: '',
    gender: 'male',
    dob: '',

    address: {},

    mobilePhone: '',
    phone1: '',
    email: '',
    comment: '',
    notificationEmail: true,
    notificationSMS: false,
    notificationCal: true
  }) {

    if (!data.address) {
      data.address = new PostalAddress();
    } else {
      data.address = new PostalAddress(data.address);
    }
    super(data);
  }


  get notificationEmail(): boolean {
    return this.getKey('notificationEmail');
  }



  get notificationSMS(): boolean {
    return this.getKey('notificationSMS');
  }



  get notificationCal(): boolean {
    return this.getKey('notificationCal');
  }



  get forename(): string {
    return this.getKey('forename');
  }


  get surname(): string {
    return this.getKey('surname');
  }


  get gender(): string {
    return this.getKey('gender');
  }



  get dob(): string {
    return this.getKey('dob');
  }


  get address(): PostalAddress {
    return this.getKey('address');
  }


  get phone1(): string {
    return this.getKey('phone1');
  }


  get mobilePhone(): string {
    return this.getKey('mobilePhone');
  }


  get email(): string {
    return this.getKey('email');
  }


  get comment(): string {
    return this.getKey('comment');
  }


  getTitle() {
    return this.forename + ' ' + this.surname;
  }

  getDescription() {
    return this.comment;
  }

  public setField(property, value) {
    return this.setKey<Participant>(Participant, property, value);
  }

}
