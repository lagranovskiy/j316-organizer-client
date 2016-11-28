import {DisplayableModel} from "./interfaces/DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanGruppe} from "./DienstPlanGruppe";
import * as moment from "moment";
import {List} from "immutable";
import {isUndefined} from "util";

interface DienstPlanData {
  uuid: string,
  planName: string,
  groupList: List<DienstPlanGruppe>,
  planStart: string,
  planEnd: string,
  eventDates: Array<string>,
  eventRecurringDays: number,
  eventStartTime: string,
  eventEndTime: string,
  notificationEmail: boolean,
  notificationSMS: boolean,
  notificationCal: boolean,
  smsText: string,
  emailText: string,
  emailSubject: string,
  calEventName: string
}

export class DienstPlan extends J316Model implements DisplayableModel {


  constructor(data: DienstPlanData = {
    uuid: '',
    planName: '',
    groupList: List<DienstPlanGruppe>(),

    planStart: moment().format('DD.MM.YYYY'),
    planEnd: moment().add(3, 'month').format('DD.MM.YYYY'),

    eventDates: [],

    eventRecurringDays: 7,
    eventStartTime: '10:00',
    eventEndTime: '12:00',

    notificationEmail: true,
    notificationSMS: true,
    notificationCal: true,

    smsText: 'Hallo am Samstag gehts los',
    emailText: 'Hallo am Samstag gehts los',
    emailSubject: 'Dienst am Samstag',
    calEventName: 'Dienst'
  }) {

    data.eventDates = DienstPlan.generateEventDates(data.planStart, data.planEnd, data.eventRecurringDays);
    super(data);
  }

  getTitle() {
    return this.planName;
  }

  getDescription() {
    let start = this.planStart;
    let end = this.planEnd;
    return 'Von ' + start + ' bis ' + end;
  }

  get planName(): string {
    return this.getKey('planName');
  }

  get groupList(): List<DienstPlanGruppe> {
    return this.getKey('groupList');
  }

  get planStart() {
    return this.getKey('planStart');
  }

  get planEnd() {
    return this.getKey('planEnd');
  }

  get eventRecurringDays(): number {
    return this.getKey('eventRecurringDays');
  }

  get eventStartTime() {
    return this.getKey('eventStartTime');
  }

  get eventEndTime() {
    return this.getKey('eventEndTime');
  }

  get eventDates() {
    return this.getKey('eventDates');
  }

  get notificationEmail(): boolean {
    return this.getKey('notificationEmail');
  }

  get notificationSMS(): boolean {
    return this.getKey('notificationSMS');
  }

  get notificationCal(): boolean {
    return this.getKey('notificationCal');
  }

  get smsText(): string {
    return this.getKey('smsText');
  }

  get emailText(): string {
    return this.getKey('emailText');
  }

  get emailSubject(): string {
    return this.getKey('emailSubject');
  }

  get calEventName(): string {
    return this.getKey('calEventName');
  }

  public setField(property, value) {
    return this.setKey<DienstPlan>(DienstPlan, property, value);
  }

  public setFieldIn(property:Array<any>, updater: (value: any) => any) {
    return this.updateIn<DienstPlan>(DienstPlan, property, updater);
  }



  static generateEventDates(startDate: string, endDate: string, eventRecurringDays: number): Array<string> {
    let eventDates = [];
    let planIterator = moment(startDate, 'DD.MM.YYYY');

    while (planIterator.isBefore(moment(endDate, 'DD.MM.YYYY'))) {
      eventDates.push(planIterator.format('DD.MM'));
      planIterator.add(eventRecurringDays, 'days');
    }
    return eventDates;
  }


  getData(): any {
    var retVal: any = <DienstPlanData> super.getData().toObject();
    var groupList: Array<any> = [];

    this.groupList.map(function (group) {

      // Complete besetzungs and verfuegbarkeit array
      let groupData = group.getData();
      groupData.sections.map(teilgruppe=> {
        for (let index = 0; index < this.eventDates.length; index++) {
          if (isUndefined(teilgruppe.besetzung[index]) || teilgruppe.besetzung[index] == null) {
            teilgruppe.besetzung[index] = false;
          }
          if (isUndefined(teilgruppe.verfuegbarkeit[index]) || teilgruppe.verfuegbarkeit[index] == null) {
            teilgruppe.verfuegbarkeit[index] = false;
          }
        }
      });

      groupList.push(groupData);
    });

    retVal.planJSON = JSON.stringify(groupList);
    return retVal;
  }


  clone() {
    var clonedData: DienstPlanData = this.getData();
    clonedData.uuid = J316Model.getUniqueIdentifier();
    clonedData.planName = clonedData.planName + ' (Cloned)';

    return new DienstPlan(clonedData);
  }




}
