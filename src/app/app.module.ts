import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AlertModule} from "ng2-bootstrap/ng2-bootstrap";
import {InputTextModule, ButtonModule} from "primeng/primeng";
import {routing} from "./app.routes";
import {createStore, combineReducers} from "redux";
import {AppStore} from "angular2-redux-util";
import {AppComponent} from "./app.component";
import {HelpComponent} from "./help/help.component";
import {IAppState} from "./store";
import personList from "./reducers/PersonListReducer";
import {PersonComponent} from "./person/Person.component";
import {PersonActions} from "./actions/PersonActions";
import {PersonListComponent} from "./person-list/person-list.component";
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonHomeComponent } from './person-home/person-home.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@NgModule({
    declarations: [
        AppComponent,
        HelpComponent,
        PersonListComponent,
        PersonComponent,
        PersonDetailComponent,
        PersonHomeComponent,
        PersonListComponent,
        DashboardHomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AlertModule,
        InputTextModule, ButtonModule,
        routing
    ],
    providers: [
        {provide: AppStore, useFactory: StoreFactory({personList})},
        {provide: PersonActions, useClass: PersonActions},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


function StoreFactory(reducerList: any) {
    return () => {
        const reducers = combineReducers<IAppState>(reducerList);
        return new AppStore(createStore(reducers));
    };
}