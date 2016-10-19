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
import {PersonListComponent} from "./personlist/PersonList.component";
import {PersonComponent} from "./person/Person.component";
import {PersonActions} from "./actions/PersonActions";

@NgModule({
    declarations: [
        AppComponent,
        HelpComponent,
        PersonListComponent,
        PersonComponent
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