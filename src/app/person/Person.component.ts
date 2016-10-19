import {Component, OnInit} from "@angular/core";
import {PersonActions} from "../actions/PersonActions";
import {AppStore} from "angular2-redux-util";
import {PersonModel} from "../model/PersonModel";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'person',
    templateUrl: 'Person.component.html',
    styleUrls: ['Person.component.css']
})
export class PersonComponent implements OnInit {

    @Input('person')
    person: PersonModel;

    removePerson() {
        this.personActions.removePerson(this.person);
    }

    constructor(private appStore: AppStore, private personActions: PersonActions) {

    }


    ngOnInit() {
    }

}
