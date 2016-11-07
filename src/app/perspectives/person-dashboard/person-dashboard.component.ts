import {Component, OnInit} from '@angular/core';
import {Participant} from "../../model/Participant";
import {ParticipantPersistenceService} from "../../participant-persistence.service";

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.component.html',
  styleUrls: ['./person-dashboard.component.css']
})
export class PersonDashboardComponent implements OnInit {

  private personList: Array<Participant>;

  constructor(service: ParticipantPersistenceService) {
    this.personList = service.fetchParticipantFromStorage();
  }

  ngOnInit() {
  }

  createNewParticipant() {

  }

  openPerson() {

  }

  removePerson() {

  }
}
