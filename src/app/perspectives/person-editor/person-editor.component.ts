import {DienstPlan} from "../../model/DienstPlan";
import {NotificationEntry} from "../../model/NotificationEntry";
import {NotificationControlService} from "../../services/notification-control-service.service";
import {Component, OnInit, ViewChild} from "@angular/core";
import {Participant} from "../../model/Participant";
import {Router, ActivatedRoute} from "@angular/router";
import {AppStoreService} from "../../services/app-store.service";
import {List} from "immutable";
import {RemovalDialogComponent} from "../../commons/removal-dialog/removal-dialog.component";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {

  private person: Participant = new Participant();
  private personUUID: string;
  private isPersistent: boolean = false;

  notifications: Array<NotificationEntry> = [];

  private existingPlans: List<DienstPlan> = List<DienstPlan>();

  private paramsSub;

  @ViewChild(RemovalDialogComponent)
  private removalDialog: RemovalDialogComponent;

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
        this.refreshNotifications();
        this.isPersistent = true;
      }
    }, ()=>{});

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
   * Open confirmation dialog
   */
  openRemovalDialog() {
    this.removalDialog.openModal();
  }

  /**
   * Remove Person
   */
  removePerson() {
    // Remove all notifications of group
    this.service.removeParticipant(this.person).subscribe(() => this.navDashboard());

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
  groupNotifcationRemove(dienstPlanUUID: string) {
    console.info("Removing: " + dienstPlanUUID );

    this.notificationService.cancelPersonGroupNotifications(dienstPlanUUID, this.person.uuid).subscribe(() => this.refreshNotifications());

  }


  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
