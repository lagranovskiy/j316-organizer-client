import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanTeilgruppe} from "./DienstPlanTeilgruppe";
import {PostalAddress} from "./PostalAddress";


export class DienstPlanGruppe extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uuid: '',
    name: 'Neue Gruppe',
    address: new PostalAddress(),
    comment: '',
    sections: [],
  }) {
    super(data);

    if (this.data.sections) {
      this.data.sections = this.data.sections.map(section=> new DienstPlanTeilgruppe(section.data));
    }

    if(this.data.address){
      this.data.address = new PostalAddress(this.data.address);
    }
  }

  get name() {
    return this.data.name;
  }

  set name(name: string) {
    this.data.name = name;
  }

  get address(): PostalAddress {
    return this.data.address;
  }

  set address(address: PostalAddress) {
    this.data.address = address;
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
