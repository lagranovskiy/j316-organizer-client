import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AlertModule} from "ng2-bootstrap/ng2-bootstrap";
import {InputTextModule, ButtonModule} from "primeng/primeng";
import {AppStore} from "angular2-redux-util";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {} from '@angular/core'

import {PlanPersistenceService} from './plan-persistence.service';

import {PlanDashboardComponent} from './plan-dashboard/plan-dashboard.component';
import {PersonViewComponent} from './person-view/person-view.component';
import {PersonEditorComponent} from './person-editor/person-editor.component';
import {GruppeViewComponent} from './gruppe-view/gruppe-view.component';
import {GruppeEditorComponent} from './gruppe-editor/gruppe-editor.component';
import {PlanEditorComponent} from './plan-editor/plan-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanDashboardComponent,
    PersonViewComponent,
    PersonEditorComponent,
    GruppeViewComponent,
    GruppeEditorComponent,
    PlanEditorComponent
  ],
  providers: [
    PlanPersistenceService
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
  bootstrap: [AppComponent]
})

export class AppModule {
}


