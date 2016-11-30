import { DienstPlan } from '../../model/DienstPlan';
import { PlanPersistenceService } from '../../services/plan-persistence.service';
import { DisplayableModel } from '../../model/interfaces/DisplayableModel';
import { NotificationEntry } from '../../model/NotificationEntry';
import { NotificationControlService } from '../../services/notification-control-service.service';
import { Component, OnInit } from '@angular/core';
import { Participant } from '../../model/Participant';
import { Router, ActivatedRoute } from '@angular/router';
import {AppStoreService} from "../../services/app-store.service";
import {List} from "immutable";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {

  private person: Participant = new Participant();
  private personUUID: string;
  private isPersistent:boolean = false;

  notifications: Array<NotificationEntry> = [];

  private existingPlans: List<DienstPlan> = List<DienstPlan>();

  private paramsSub;

  constructor(private service: AppStoreService,
    private notificationService: NotificationControlService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.service.planList.subscribe(plans => this.existingPlans = plans);

    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.personUUID = params["uuid"];
    });

    this.service.personList.subscribe((personList: List<Participant>)=> {
      let foundIndex = personList.findIndex(person=>this.personUUID == person.uuid);
      if (foundIndex > -1) {
        this.person = personList.get(foundIndex);
        this.isPersistent = true;
      }
    });

  }


  navDashboard() {
    this.router.navigate(['/person/all']);
  }

  saveChanges() {
    this.service.saveParticipant(this.person).subscribe();
  }

  ngOnInit() {

  }

  /**
   * Fetch NotificationEntry for the given person
   */
  refreshNotifications() {
    this.notificationService.fetchPersonNotifications(this.person.uuid).subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  /**
   * Creates a function that groups notification by a plan they a referencing
   */
  groupByPlan(): (notification: NotificationEntry) => DisplayableModel {
    let _me = this;
    return (notification: NotificationEntry): DisplayableModel => {

      let planUUID = notification.category[0];
      let foundPlans = _me.existingPlans.filter(plan => plan.uuid === planUUID);
      if (foundPlans.size == 0) {
        console.error('Illegal State.. Notifications for non existent plan found. removed?');
        return null;
      }

      return <DisplayableModel>
        {
          uuid: planUUID,
          getDescription: () => null,
          getTitle: () => foundPlans.first().planName
        }

    }
  }

  /**
   * Remove all notifications of a person
   */
  groupPersonNotifcations() {
    // Remove all notifications of group
    this.notificationService.cancelPersonNotifications(this.person.uuid).subscribe(() => this.refreshNotifications());

  }

  /**
   * Remove combinations from group1UUID with referenceId person.uuid
   */
  groupNotifcationRemove(data: { group1UUID: string, group2UUID: string }) {
    console.info("Removing: " + data.group1UUID + "   " + data.group2UUID);

    this.notificationService.cancelPersonGroupNotifications(data.group1UUID, this.person.uuid).subscribe(() => this.refreshNotifications());

  }


  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
