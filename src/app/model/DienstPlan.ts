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
      planStart: new Date(),
      planEnd: new Date()
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
    let start = moment(this.data.planInformation.planStart).format('MM.YYYY');
    let end = moment(this.data.planInformation.planEnd).format('MM.YYYY');
    return 'Von ' + start + ' bis ' + end;
  }

}
