import {PersonActions} from "../actions/PersonActions";
import {Component, OnInit} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {PersonModel} from "../model/PersonModel";

@Component({
  selector: 'personlist',
  templateUrl: 'PersonList.component.html',
  styleUrls: ['PersonList.component.css']
})
export class PersonListComponent implements OnInit {

  private personList: Array<PersonModel>;

  private newPersonTest: Object = {};

  private unsub: Function;

  constructor(private appStore: AppStore, private personActions: PersonActions) {

    this.personList = appStore.getState().personList

    this.unsub = appStore.sub((state: any)=> {
      console.info("Hey im AppComponent and got update! ")
      this.personList = appStore.getState().personList;
    }, 'personList')
  }


  addPerson() {
    this.personActions.addNewPerson(this.newPersonTest);
  }

  ngOnInit() {
  }

  private ngOnDestroy() {
    this.unsub();
  }
}
