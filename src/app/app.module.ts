import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {MaterializeDirective} from "angular2-materialize";
import {AgmCoreModule} from "angular2-google-maps/core";
import {APP_CONFIG, J316_CONFIG} from "./config/const";

import {ParticipantPersistenceService} from "./participant-persistence.service";
import {NotificationControlService} from "./notification-control-service.service";
import {AddressPersistenceService} from "./address-persistence.service";

import {ViewCardComponent} from "./commons/view-card/view-card.component";

import {PlanDashboardComponent} from "./perspectives/plan-dashboard/plan-dashboard.component";
import {PlanEditorComponent} from "./perspectives/plan-editor/plan-editor.component";
import { PersonDashboardComponent } from './perspectives/person-dashboard/person-dashboard.component';
import { PlanNotificationViewComponent } from './perspectives/plan-notification-view/plan-notification-view.component';
import { PersonEditorComponent } from './perspectives/person-editor/person-editor.component';
import { PlanViewComponent } from './perspectives/plan-view/plan-view.component';

import {GruppeViewComponent} from "./plan/gruppe-view/gruppe-view.component";
import {GruppeEditorComponent} from "./plan/gruppe-editor/gruppe-editor.component";
import {ParticipantRefListViewComponent} from "./plan/participant-ref-list-view/participant-ref-list-view.component";
import {ParticipantListSingleViewComponent} from "./plan/participant-list-single-view/participant-list-single-view.component";
import {PlanPersistenceService} from "./plan-persistence.service";
import {PlanTableComponent} from "./plan/plan-table/plan-table.component";
import { AddressEditorComponent } from './commons/address-editor/address-editor.component';
import { PlanNavigationToolbarComponent } from './plan/plan-navigation-toolbar/plan-navigation-toolbar.component';
import { PlanNotificationProcessorComponent } from './plan/plan-notification-processor/plan-notification-processor.component';
import { OrderByPipe } from './order-by.pipe';
import { NotificationPresenterComponent } from './commons/notification-presenter/notification-presenter.component';
import { NotificationSingleGroupPresenterComponent } from './commons/notification-single-group-presenter/notification-single-group-presenter.component';
import {AppStoreService} from "./app-store.service";

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
    PlanTableComponent,
    PersonDashboardComponent,
    PersonEditorComponent,
    AddressEditorComponent,
    PlanViewComponent,
    PlanNotificationViewComponent,
    PlanNavigationToolbarComponent,
    PlanNotificationProcessorComponent,
    OrderByPipe,
    NotificationPresenterComponent,
    NotificationSingleGroupPresenterComponent
  ],
  providers: [
    PlanPersistenceService,
    ParticipantPersistenceService,
    NotificationControlService,
    AddressPersistenceService,
    AppStoreService,
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


