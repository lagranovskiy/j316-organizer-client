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
    return this.data.location;
  }

  set location(location: string) {
    this.data.location = location;
  }

  get longitude() {
    return this.data.longitude;
  }

  set longitude(longitude: number) {
    this.data.longitude = longitude;
  }

  get latitude() {
    return this.data.latitude;
  }

  set latitude(latitude: number) {
    this.data.latitude = latitude;
  }


  set street(street: string) {
    this.data.street = street;
  }

  get street(): string {
    return this.data.street;
  }


  set zip(zip: string) {
    this.data.zip = zip;
  }

  get zip(): string {
    return this.data.zip;
  }


  set city(city: string) {
    this.data.city = city;
  }

  get city(): string {
    return this.data.city;
  }


  set country(country: string) {
    this.data.country = country;
  }

  get country(): string {
    return this.data.country;
  }


  set comment(comment: string) {
    this.data.comment = comment;
  }

  get comment(): string {
    return this.data.comment;
  }

}
