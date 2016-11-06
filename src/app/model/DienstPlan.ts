import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanGruppe} from "./DienstPlanGruppe";
import * as moment from "moment";

export class DienstPlan extends J316Model implements DisplayableModel {

  constructor(data: any = {
    uid: '',
    planName: '',
    groupList: [],

    planStart: moment().format('DD.MM.YYYY'),
    planEnd: moment().add(3, 'month').format('DD.MM.YYYY'),

    eventDates: [],

    eventRecurringDays: 7,
    eventStartTime: '10:00',
    eventEndTime: '12:00'
  }) {
    super(data);

    if (this.data.groupList) {
      this.data.groupList = this.data.groupList.map(group=> new DienstPlanGruppe(group.data));
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


  getTitle() {
    return this.data.planName;
  }


  get planStart() {
    return this.data.planStart;
  }

  set planStart(planStart: string) {
    this.data.planStart = planStart;
  }

  get planEnd() {
    return this.data.planEnd;
  }

  set planEnd(planEnd: string) {
    this.data.planEnd = planEnd;
  }

  get eventRecurringDays(): number {
    return this.data.eventRecurringDays;
  }

  set eventRecurringDays(eventRecurringDays: number) {
    this.data.eventRecurringDays = eventRecurringDays;
  }

  get eventStartTime() {
    return this.data.eventStartTime;
  }

  set eventStartTime(eventStartTime: string) {
    this.data.eventStartTime = eventStartTime;
  }

  get eventEndTime() {
    return this.data.eventEndTime;
  }

  set eventEndTime(eventEndTime: string) {
    this.data.eventEndTime = eventEndTime;
  }

  get eventDates() {
    return this.data.eventDates;
  }


  getDescription() {
    let start = this.data.planStart;
    let end = this.data.planEnd;
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
