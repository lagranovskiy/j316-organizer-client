import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanGruppe} from "./DienstPlanGruppe";
import {DienstPlanCalenderInfo} from "./DienstPlanCalenderInfo";

export class DienstPlan extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uid: '',
    planName: '',
    groupList: [],
    planInformation: {},
    plan: {}
  }) {
    super(data);

    if (this.data.groupList) {
      this.data.groupList = this.data.groupList.map(group=> new DienstPlanGruppe(group.data));
    }

    if (this.data.planInformation) {
      this.data.planInformation = new DienstPlanCalenderInfo(data.planInformation.data);
    }
  }

  get planName(): string {
    return this.data.planName;
  }

  set planName(planName: string) {
    this.data.planName = planName;
  }


  get groupList(): Array<DienstPlanGruppe> {
    return this.data.groupList;
  }

  get planInformation() : DienstPlanCalenderInfo{
    return this.data.planInformation;
  }

  get plan() {
    return this.data.plan;
  }

  getTitle() {
    return this.data.planName;
  }


  getDescription() {
    let start = this.data.planInformation.planStart;
    let end = this.data.planInformation.planEnd;
    return 'Von ' + start + ' bis ' + end;
  }

  clone() {
    let clonedData: any = super.cloneData();
    clonedData.uid = super.getUniqueIdentifier();
    clonedData.planName = clonedData.planName + '(Cloned)';

    let retVal: DienstPlan = new DienstPlan(clonedData);

    return retVal;
  }

}
