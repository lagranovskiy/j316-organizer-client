import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanTeilgruppe} from "./DienstPlanTeilgruppe";


export class DienstPlanGruppe extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uid: '',
    name: 'Neue Gruppe',
    location: '',
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
    clonedData.uid = super.getUniqueIdentifier();

    return new DienstPlanGruppe(clonedData);
  }

}
