import {Component, OnInit} from "@angular/core";
import {Participant} from "../../model/Participant";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.component.html',
  styleUrls: ['./person-dashboard.component.css']
})
export class PersonDashboardComponent implements OnInit {

  private personList: Array<Participant>;

  constructor(private service: ParticipantPersistenceService, private router: Router) {

  }


  ngOnInit() {
    this.refreshParticipants();
  }

  refreshParticipants() {
    this.service.fetchParticipants().subscribe(result => this.personList = result);
  }

  createNewParticipant() {
    this.router.navigate([`/person`]);
  }

  openPerson(participant: Participant) {
    this.router.navigate([`/person/${participant.uuid}`]);
  }

  removePerson(participant: Participant) {
    this.service.removeParticipant(participant.uuid).subscribe(result => this.refreshParticipants());
  }
}
