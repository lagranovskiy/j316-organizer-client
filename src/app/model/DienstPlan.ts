export class DienstPlan {

  constructor(private data: any = {
    groupList: [],
    personList: [],
    planInformation: {
      planName: '',
      planStart: new Date(),
      planEnd: new Date()
    },
    plan: {}
  }) {

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

  getData() {
    return this.data;
  }


}
