import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, RequestOptions} from "@angular/http";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {MaterializeDirective} from "angular2-materialize";
import {AgmCoreModule} from "angular2-google-maps/core";
import {PlanDashboardComponent} from "./perspectives/plan-dashboard/plan-dashboard.component";
import {PlanEditorComponent} from "./perspectives/plan-editor/plan-editor.component";
import {ViewCardComponent} from "./commons/view-card/view-card.component";
import {GruppeViewComponent} from "./plan/gruppe-view/gruppe-view.component";
import {GruppeEditorComponent} from "./plan/gruppe-editor/gruppe-editor.component";
import {ParticipantRefListViewComponent} from "./plan/participant-ref-list-view/participant-ref-list-view.component";
import {ParticipantListSingleViewComponent} from "./plan/participant-list-single-view/participant-list-single-view.component";
import {PlanPersistenceService} from "./plan-persistence.service";
import {ParticipantPersistenceService} from "./participant-persistence.service";
import {PlanCalenderInfoEditorComponent} from "./plan/plan-calender-info-editor/plan-calender-info-editor.component";
import {PlanTableComponent} from "./plan/plan-table/plan-table.component";
import {AppRequestOptions} from "./config/AppRequestOptions";
import {APP_CONFIG, J316_CONFIG} from "./config/const";


@NgModule({
  declarations: [
    AppComponent,
    PlanDashboardComponent,
    GruppeViewComponent,
    GruppeEditorComponent,
    PlanEditorComponent,
    MaterializeDirective,
    ViewCardComponent,
    ParticipantRefListViewComponent,
    ParticipantListSingleViewComponent,
    PlanCalenderInfoEditorComponent,
    PlanTableComponent
  ],
  providers: [
    PlanPersistenceService,
    ParticipantPersistenceService,
    {provide: APP_CONFIG, useValue: J316_CONFIG}
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: J316_CONFIG.mapsAPI,
      libraries: ["places"]
    }),
    HttpModule,
    routing,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}


