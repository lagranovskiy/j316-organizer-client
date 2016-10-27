import {DisplayableModel} from "./DisplayableModel";
import * as moment from "moment";
import {J316Model} from "./J316Model";

export class DienstPlan extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uid: '',
    groupList: [],
    personList: [],
    planInformation: {
      planName: '',
      planStart: moment().format('DD.MM.YYYY'),
      planEnd: moment().add(3,'month').format('DD.MM.YYYY')
    },
    plan: {}
  }) {
    super(data);
  }



  get groupList() {
    return this.data.groupList;
  }

  get personList() {
    return this.data.personList;
  }

  get planInformation() {
    return this.data.planInformation;
  }

  get plan() {
    return this.data.plan;
  }

  getTitle() {
    return this.data.planInformation.planName;
  }

  getDescription() {
    let start = this.data.planInformation.planStart;
    let end = this.data.planInformation.planEnd;
    return 'Von ' + start + ' bis ' + end;
  }

  clone(){
    let clonedData:any = super.cloneData();
    clonedData.uid = super.getUniqueIdentifier();
    clonedData.planInformation.planName = clonedData.planInformation.planName + '(Cloned)';

    let retVal:DienstPlan = new DienstPlan(clonedData);

    return retVal;
  }

}
