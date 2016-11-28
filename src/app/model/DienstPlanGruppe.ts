import {DisplayableModel} from "./interfaces/DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanTeilgruppe} from "./DienstPlanTeilgruppe";
import {PostalAddress} from "./PostalAddress";
import {List} from "immutable";

export interface DienstPlanGruppeData {
  uuid: string,
  name: string,
  address: PostalAddress | any,
  comment: string,
  sections: List<DienstPlanTeilgruppe>
}

export class DienstPlanGruppe extends J316Model implements DisplayableModel {

  constructor(data: DienstPlanGruppeData = {
    uuid: '',
    name: 'Neue Gruppe',
    address: {},
    comment: '',
    sections: List<DienstPlanTeilgruppe>(),
  }) {

    super(data);
  }

  /**
   * Title to be shown in the lists
   * @return {any}
   */
  getTitle() {
    return this.name;
  }

  /**
   * Description for the view
   * @return {string|any|string|number|Location|ElementRef}
   */
  getDescription() {
    return this.address.location;
  }

  get name() {
    return this.getKey('name');
  }


  get address(): PostalAddress {
    return this.getKey('address');
  }


  get comment() {
    return this.getKey('comment');
  }


  get sections(): List<DienstPlanTeilgruppe> {
    return this.getKey('sections');
  }

  public setField(property, value) {
    return this.setKey<DienstPlanGruppe>(DienstPlanGruppe, property, value);
  }

  public setFieldIn(property:Array<any>, updater: (value: any) => any) {
    return this.updateIn<DienstPlanGruppe>(DienstPlanGruppe, property, updater);
  }


  getData(): any {
    var retVal: any= <DienstPlanGruppeData>super.getData().toObject();

    retVal.address = retVal.address.getData();
    var sectionList: Array<any> = [];

    this.sections.map(function (section) {
      sectionList.push(section.getData())
    });

    // No serialization needed, whole object will be json serialized one level higher
    retVal.sections = sectionList;
    return retVal;
  }

  clone(): DienstPlanGruppe {
    let clonedData: any = this.getData();
    clonedData.uuid = J316Model.getUniqueIdentifier();

    return new DienstPlanGruppe(clonedData);
  }

}
