import {Component, OnInit} from "@angular/core";
import {Participant} from "../../model/Participant";
import {Router} from "@angular/router";
import {AppStoreService} from "../../services/app-store.service";
import {List} from "immutable";

@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.component.html',
  styleUrls: ['./person-dashboard.component.css']
})
export class PersonDashboardComponent implements OnInit {

  private searchString: string;
  private personList: List<Participant> = List<Participant>();

  constructor(private service: AppStoreService, private router: Router) {
    service.personList.subscribe(personList => this.personList=personList);
  }


  ngOnInit() {
  }

  createNewParticipant() {
    this.router.navigate([`/person`]);
  }

  openPerson(participant: Participant) {
    this.router.navigate([`/person/${participant.uuid}`]);
  }

  removePerson(participant: Participant) {
    this.service.removeParticipant(participant).subscribe();
  }
}
