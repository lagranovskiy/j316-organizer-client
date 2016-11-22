import {DisplayableModel} from "./DisplayableModel";
import {J316Model} from "./J316Model";
import {DienstPlanGruppe} from "./DienstPlanGruppe";
import * as moment from "moment";

export class DienstPlan extends J316Model implements DisplayableModel {


  constructor(data: {uuid: string,
    planName: string,
    groupList: Array<DienstPlanGruppe>,
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
  } = {
    uuid: '',
    planName: '',
    groupList: [],

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
    calEventName: ''
  }) {
    super(data);

    if (this.data.planJSON) {
      this.data.groupList = JSON.parse(this.data.planJSON);
    }

    if (this.data.groupList) {
      this.data.groupList = this.data.groupList.map(group=> new DienstPlanGruppe(group));
    } else {
      this.data.groupList = [];
    }


    this.generateEventDates();

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
    this.generateEventDates();
  }

  get planEnd() {
    return this.data.planEnd;
  }

  set planEnd(planEnd: string) {
    this.data.planEnd = planEnd;
    this.generateEventDates();
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


  get notificationEmail(): boolean {
    return this.data.notificationEmail;
  }

  set notificationEmail(value: boolean) {
    this.data.notificationEmail = value;
  }

  get notificationSMS(): boolean {
    return this.data.notificationSMS;
  }

  set notificationSMS(value: boolean) {
    this.data.notificationSMS = value;
  }


  get notificationCal(): boolean {
    return this.data.notificationCal;
  }

  set notificationCal(value: boolean) {
    this.data.notificationCal = value;
  }

  get smsText(): string {
    return this.data.smsText;
  }

  set smsText(value: string) {
    this.data.smsText = value;
  }

  get emailText(): string {
    return this.data.emailText;
  }

  set emailText(value: string) {
    this.data.emailText = value;
  }

  get emailSubject(): string {
    return this.data.emailSubject;
  }

  set emailSubject(value: string) {
    this.data.emailSubject = value;
  }

  get calEventName(): string {
    return this.data.calEventName;
  }

  set calEventName(value: string) {
    this.data.calEventName = value;
  }


  public generateEventDates() {
    this.data.eventDates = [];
    let planIterator = moment(this.planStart, 'DD.MM.YYYY');

    while (planIterator.isBefore(moment(this.planEnd, 'DD.MM.YYYY'))) {
      this.data.eventDates.push(planIterator.format('DD.MM'));
      planIterator.add(this.eventRecurringDays, 'days');
    }
  }

  getData(): any {
    var retVal = super.getData();
    var groupList: Array<any> = [];

    this.groupList.map(function (group) {
      groupList.push(group.getData())
    });

    retVal.planJSON = JSON.stringify(groupList);
    return retVal;
  }

  getDescription() {
    let start = this.data.planStart;
    let end = this.data.planEnd;
    return 'Von ' + start + ' bis ' + end;
  }

  clone() {
    let clonedData: any = super.cloneData();
    clonedData.uuid = super.getUniqueIdentifier();
    clonedData.planName = clonedData.planName + '(Cloned)';

    let retVal: DienstPlan = new DienstPlan(clonedData);

    return retVal;
  }

}
