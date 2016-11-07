import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanTeilgruppe} from "./DienstPlanTeilgruppe";
import {LocationBasedModel} from "./LocationBasedModel";


export class DienstPlanGruppe extends J316Model implements DisplayableModel, LocationBasedModel {

  constructor(data: any = {
    uuid: '',
    name: 'Neue Gruppe',
    location: '',
    latitude: 0,
    longitude: 0,
    comment: '',
    sections: [],
  }) {
    super(data);

    if (this.data.sections) {
      this.data.sections = this.data.sections.map(section=> new DienstPlanTeilgruppe(section.data));
    }
  }

  get name() {
    return this.data.name;
  }

  set name(name: string) {
    this.data.name = name;
  }

  get location() {
    return this.data.location;
  }

  set location(location: string) {
    this.data.location = location;
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

  get longitude() {
    return this.data.longitude;
  }

  get comment() {
    return this.data.comment;
  }

  set comment(comment: string) {
    this.data.comment = comment;
  }

  get sections(): Array<DienstPlanTeilgruppe> {
    return this.data.sections;
  }

  /**
   * Title to be shown in the lists
   * @return {any}
   */
  getTitle() {
    return this.data.name;
  }

  /**
   * Description for the view
   * @return {string|any|string|number|Location|ElementRef}
   */
  getDescription() {
    return this.data.location;
  }

  clone(): DienstPlanGruppe {
    let clonedData: any = super.cloneData();
    clonedData.uuid = super.getUniqueIdentifier();

    return new DienstPlanGruppe(clonedData);
  }

}
