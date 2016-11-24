import { DienstPlan } from '../../model/DienstPlan';
import { PlanPersistenceService } from '../../plan-persistence.service';
import { DisplayableModel } from '../../model/DisplayableModel';
import { DienstPlanGruppe } from '../../model/DienstPlanGruppe';
import { NotificationEntry } from '../../model/NotificationEntry';
import { NotificationControlService } from '../../notification-control-service.service';
import { ParticipantPersistenceService } from '../../participant-persistence.service';
import { Component, OnInit } from '@angular/core';
import { Participant } from '../../model/Participant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {

  private person: Participant = new Participant();

  notifications: Array<NotificationEntry> = [];

  private existingPlans: Array<DienstPlan> = [];

  private paramsSub;

  constructor(private service: ParticipantPersistenceService,
    private notificationService: NotificationControlService,
    private planService: PlanPersistenceService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }


  navDashboard() {
    this.router.navigate(['/person/all']);
  }

  saveChanges() {
    this.service.saveParticipant(this.person).subscribe(saved => this.person = saved);
  }

  ngOnInit() {
    this.planService.fetchPlans().subscribe(plans => this.existingPlans = plans);

    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let personUUID = params["uuid"];

      if (personUUID) {
        this.service.fetchParticipant(personUUID).subscribe(person => {
          this.person = person;
          this.refreshNotifications()
        });
      }
    });
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
      if (foundPlans.length == 0) {
        console.error('Illegal State.. Notifications for non existent plan found. removed?');
        return null;
      }

      return <DisplayableModel>
        {
          uuid: planUUID,
          getDescription: () => null,
          getTitle: () => foundPlans[0].planName
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
