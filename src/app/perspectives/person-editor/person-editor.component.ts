import {Component, OnInit} from '@angular/core';
import {Participant} from "../../model/Participant";
import {ParticipantPersistenceService} from "../../participant-persistence.service";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {

  private person: Participant;

  constructor(private service: ParticipantPersistenceService) {

  }

  ngOnInit() {
  }


  navDashboard() {
  }

  saveChanges() {
  }
}
