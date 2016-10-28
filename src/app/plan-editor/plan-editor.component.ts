import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanPersistenceService} from "../plan-persistence.service";
import {DienstPlan} from "../model/DienstPlan";
import {DienstPlanGruppe} from "../model/DienstPlanGruppe";
import {GruppeEditorComponent} from "../gruppe-editor/gruppe-editor.component";
import {Participant} from "../model/Participant";
import {DienstPlanTeilgruppe} from "../model/DienstPlanTeilgruppe";
import any = jasmine.any;

@Component({
  selector: 'plan-editor',
  templateUrl: './plan-editor.component.html',
  styleUrls: ['./plan-editor.component.css']
})
export class PlanEditorComponent implements OnInit {

  private planUID: string;
  private plan: DienstPlan = new DienstPlan();
  private paramsSub;

  private selectedGroup: DienstPlanGruppe;

  private selectedOption: string = '';

  @ViewChild(GruppeEditorComponent)
  private gruppeEditor: GruppeEditorComponent;

  private dummyPersonen: Array<Participant> = [
    new Participant({
      forename: 'Leonid',
      surname: 'Agranovskiy'
    }), new Participant({forename: 'Max', surname: 'Loos'}), new Participant({
      forename: 'Vitalij',
      surname: 'Funk'
    }), new Participant({forename: 'Mark', surname: 'Gorlicj'})];


  constructor(private service: PlanPersistenceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.plan.planInformation.planName = 'Neue Plan';


  }

  getGroups() {
    return this.plan.groupList;
  }

  addTeilgruppe(gruppe) {
    let newDienstPlanTeilgruppe = new DienstPlanTeilgruppe();
    gruppe.sections.push(newDienstPlanTeilgruppe);
  }

  addDienstPlanGruppe() {
    let newGroup = new DienstPlanGruppe();

    this.plan.groupList.push(newGroup);
    this.selectedGroup = newGroup;
  }

  openDienstPlanGruppe(gruppe) {
    this.selectedGroup = gruppe;
  }

  removeDienstPlanGruppe(gruppe) {
    this.plan.groupList.splice(this.plan.groupList.indexOf(gruppe), 1);
  }

  navDashboard() {
    this.router.navigate(['/']);
  }

  removePlan() {
    this.service.removePlan(this.plan);
    this.navDashboard();
  }

  saveChanges() {
    this.service.upsertPlan(this.plan);
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      let test = params["uid"];
      this.planUID = test;

      if (this.planUID) {
        this.plan = this.service.fetchPlanById(this.planUID);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
