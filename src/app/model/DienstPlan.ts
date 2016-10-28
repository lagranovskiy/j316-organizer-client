import {DisplayableModel} from "./DisplayableModel";
import * as moment from "moment";
import {J316Model} from "./J316Model";
import {DienstPlanGruppe} from "./DienstPlanGruppe";

export class DienstPlan extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uid: '',
    groupList: [],
    planInformation: {
      planName: '',
      planStart: moment().format('DD.MM.YYYY'),
      planEnd: moment().add(3, 'month').format('DD.MM.YYYY'),
      planWeekday: 6
    },
    plan: {}
  }) {
    super(data);

    if (this.data.groupList) {
      this.data.groupList = this.data.groupList.map(group=> new DienstPlanGruppe(group.data));
    }
  }


  get groupList(): Array<DienstPlanGruppe> {
    return this.data.groupList;
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

  clone() {
    /**
     * TODO: Eventually deep cloninig of groups need to be implemented
     */
    let clonedData: any = super.cloneData();
    clonedData.uid = super.getUniqueIdentifier();
    clonedData.planInformation.planName = clonedData.planInformation.planName + '(Cloned)';

    let retVal: DienstPlan = new DienstPlan(clonedData);

    return retVal;
  }

}
