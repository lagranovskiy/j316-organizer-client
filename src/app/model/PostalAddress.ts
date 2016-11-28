import {J316Model} from "./J316Model";
import {LocationBasedModel} from "./interfaces/LocationBasedModel";


export class PostalAddress extends J316Model implements LocationBasedModel {


  constructor(data: any = {
    uuid: '',

    location: '',
    latitude: 0,
    longitude: 0,

    street: '',
    zip: '',
    city: '',
    country: '',
    comment: '',

  }) {
    super(data);
  }


  get location(): string {
    return this.getKey('location');
  }

  get longitude() {
    return this.getKey('longitude');
  }

  get latitude() {
    return this.getKey('latitude');
  }

  get street(): string {
    return this.getKey('street');
  }

  get zip(): string {
    return this.getKey('zip');
  }

  get city(): string {
    return this.getKey('city');
  }

  get country(): string {
    return this.getKey('country');
  }

  get comment(): string {
    return this.getKey('comment');
  }


  public setField(property, value) {
    return this.setKey<PostalAddress>(PostalAddress, property, value);
  }
}
