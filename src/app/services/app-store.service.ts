import {Injectable} from "@angular/core";
import {Participant} from "../model/Participant";
import {DienstPlan} from "../model/DienstPlan";
import {Observable, BehaviorSubject} from "rxjs";
import {List} from "immutable";
import {ParticipantPersistenceService} from "./participant-persistence.service";
import {PlanPersistenceService} from "./plan-persistence.service";
import {AuthService} from "./auth-service.service";
import {AlertService} from "./alert.service";
import {NotificationControlService} from "./notification-control-service.service";

@Injectable()
export class AppStoreService {

  private _personList: BehaviorSubject<List<Participant>> = new BehaviorSubject(List<Participant>());
  public personList: Observable<List<Participant>> = this._personList.asObservable();

  private _planList: BehaviorSubject<List<DienstPlan>> = new BehaviorSubject<List<DienstPlan>>(List<DienstPlan>());
  public planList: Observable<List<DienstPlan>> = this._planList.asObservable();

  constructor(private participantService: ParticipantPersistenceService,
              private planService: PlanPersistenceService,
              private notificationService: NotificationControlService,
              private alertService: AlertService, private auth: AuthService) {
    auth.authEvent.subscribe(res => {
      // Remove stored data if no authentication
      if (res.authentication == false) {
        this._personList.next(List<Participant>());
        this._planList.next(List<DienstPlan>());
      } else if (res.authentication == true) {
        this.loadData();
      }
    })
  }

  public loadData() {
    this.participantService.fetchParticipants().subscribe(participants=>this._personList.next(List<Participant>(participants)));
    this.planService.fetchPlans().subscribe(plans=>this._planList.next(List<DienstPlan>(plans)));
  }

  public savePlan(plan: DienstPlan) {
    return this.planService.savePlan(plan).map(savedPlan => {
      let index = this._planList.value.findIndex(plan=> plan.uuid == savedPlan.uuid);
      if (index > -1) {
        this._planList.next(this._planList.value.update(index, plan=>savedPlan));
      } else {
        this._planList.next(this._planList.value.push(savedPlan));
      }
    });
  }

  public removePlan(planUUID: string) {
    return this.planService.removePlan(planUUID).map(removedPlan => {
      let index = this._planList.value.findIndex(plan=> plan.uuid == planUUID);
      if (index > -1) {
        this._planList.next(this._planList.value.delete(index));
      } else {
        this.alertService.handleCustomError('Cannot remove plan that is not stored.', planUUID);
      }
    }).map(removedPlan=> {
      this.notificationService.cancelGroupNotifications(planUUID).subscribe(()=> {
        this.alertService.showNotification('Plan sowie Planbenachrichtigungen gelöscht')
      });
    });
  }

  public saveParticipant(participant: Participant) {
    return this.participantService.saveParticipant(participant).map(savedParticipant => {
      let index = this._personList.value.findIndex(participant=> participant.uuid == savedParticipant.uuid);
      if (index > -1) {
        this._personList.next(this._personList.value.update(index, participant=>savedParticipant));
      } else {
        this._personList.next(this._personList.value.push(savedParticipant));
      }
    });
  }

  public removeParticipant(participant: Participant) {
    return this.participantService.removeParticipant(participant.uuid).map(removedParticipant => {
      let index = this._personList.value.findIndex(participant=> participant.uuid == removedParticipant.uuid);
      if (index > -1) {
        this._personList.next(this._personList.value.delete(index));
      } else {
        this.alertService.handleCustomError('Cannot remove participant that is not stored.', participant);
      }
    })
      .map(removedParticipant=> {
        this.notificationService.cancelPersonNotifications(participant.uuid).subscribe(()=> {
          this.alertService.showNotification('Teilnehmer sowie Planbenachrichtigungen gelöscht')
        });
      });
    ;
  }
}
