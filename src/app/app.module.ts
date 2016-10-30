import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {MaterializeDirective} from "angular2-materialize";

import {PlanPersistenceService} from './plan-persistence.service';

import {PlanDashboardComponent} from './plan-dashboard/plan-dashboard.component';
import {PersonViewComponent} from './person-view/person-view.component';
import {PersonEditorComponent} from './person-editor/person-editor.component';
import {GruppeViewComponent} from './gruppe-view/gruppe-view.component';
import {GruppeEditorComponent} from './gruppe-editor/gruppe-editor.component';
import {PlanEditorComponent} from './plan-editor/plan-editor.component';
import {ViewCardComponent} from './view-card/view-card.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanDashboardComponent,
    PersonViewComponent,
    PersonEditorComponent,
    GruppeViewComponent,
    GruppeEditorComponent,
    PlanEditorComponent,
    MaterializeDirective,
    ViewCardComponent
  ],
  providers: [
    PlanPersistenceService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}


