import * as moment from "moment";
import Immutable from "immutable";

export class DienstPlanCalenderInfo {

  constructor(private data: any = {
    planStart: moment().format('DD.MM.YYYY'),
    planEnd: moment().add(3, 'month').format('DD.MM.YYYY'),

    eventWeekday: 6,
    eventRecurringDays: 7,
    eventStartTime: '10:00',
    eventEndTime: '10:00'
  }) {

  }

  getData() {
    return this.data
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

  get eventWeekday(): number {
    return this.data.eventWeekday;
  }

  set eventWeekday(eventWeekday: number) {
    this.data.eventWeekday = eventWeekday;
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
    return this.data.eventStartTime;
  }

  set eventEndTime(eventEndTime: string) {
    this.data.eventEndTime = eventEndTime;
  }

  clone() {
    let clonedData = Immutable.Map(this.data).toObject();
    return new DienstPlanCalenderInfo(clonedData);
  }

}
