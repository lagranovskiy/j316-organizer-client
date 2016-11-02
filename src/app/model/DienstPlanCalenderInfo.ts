import * as moment from "moment";
import Immutable from "immutable";

export class DienstPlanCalenderInfo {

  constructor(private data: any = {
    planStart: moment().format('DD.MM.YYYY'),
    planEnd: moment().add(3, 'month').format('DD.MM.YYYY'),

    eventDates: [],

    eventRecurringDays: 7,
    eventStartTime: '10:00',
    eventEndTime: '12:00'
  }) {

  }

  getData() {
    return this.data
  }


  generateEventDates() {
    this.eventDates.splice(0, this.eventDates.length);
    this.eventDates.push('17.01.16');
    this.eventDates.push('27.01.16');
    this.eventDates.push('17.02.16');
    this.eventDates.push('27.02.16');
    this.eventDates.push('17.03.16');
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


  clone() {
    let clonedData = Immutable.Map(this.data).toObject();
    return new DienstPlanCalenderInfo(clonedData);
  }

}
