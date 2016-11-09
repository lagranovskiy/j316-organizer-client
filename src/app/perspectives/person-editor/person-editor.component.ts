import {Component, OnInit} from "@angular/core";
import {Participant} from "../../model/Participant";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {

  private person: Participant = new Participant();

  private paramsSub;

  constructor(private service: ParticipantPersistenceService,
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
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let personUUID = params["uuid"];

      if (personUUID) {
        this.service.fetchParticipant(personUUID).subscribe(person=> this.person = person);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
