import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, RequestOptions, Http} from "@angular/http";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {AgmCoreModule} from "angular2-google-maps/core";
import {APP_CONFIG, J316_CONFIG} from "./config/const";
//import {AUTH_PROVIDERS} from "angular2-jwt";
import {ParticipantPersistenceService} from "./services/participant-persistence.service";
import {NotificationControlService} from "./services/notification-control-service.service";
import {AddressPersistenceService} from "./services/address-persistence.service";
import {ViewCardComponent} from "./commons/view-card/view-card.component";
import {PlanDashboardComponent} from "./perspectives/plan-dashboard/plan-dashboard.component";
import {PlanEditorComponent} from "./perspectives/plan-editor/plan-editor.component";
import {PersonDashboardComponent} from "./perspectives/person-dashboard/person-dashboard.component";
import {PlanNotificationViewComponent} from "./perspectives/plan-notification-view/plan-notification-view.component";
import {PersonEditorComponent} from "./perspectives/person-editor/person-editor.component";
import {PlanViewComponent} from "./perspectives/plan-view/plan-view.component";
import {GruppeViewComponent} from "./plan/gruppe-view/gruppe-view.component";
import {GruppeEditorComponent} from "./plan/gruppe-editor/gruppe-editor.component";
import {ParticipantRefListViewComponent} from "./plan/participant-ref-list-view/participant-ref-list-view.component";
import {PlanPersistenceService} from "./services/plan-persistence.service";
import {PlanTableComponent} from "./plan/plan-table/plan-table.component";
import {AddressEditorComponent} from "./commons/address-editor/address-editor.component";
import {PlanNavigationToolbarComponent} from "./plan/plan-navigation-toolbar/plan-navigation-toolbar.component";
import {PlanNotificationProcessorComponent} from "./plan/plan-notification-processor/plan-notification-processor.component";
import {OrderByPipe} from "./pipes/order-by.pipe";
import {NotificationSingleGroupPresenterComponent} from "./commons/notification-single-group-presenter/notification-single-group-presenter.component";
import {AppStoreService} from "./services/app-store.service";
import {PersonRefPipe} from "./pipes/person-ref.pipe";
import {ParticipantFlatPipe} from "./pipes/participant-flat.pipe";
import {GeoMapComponent} from "./commons/geo-map/geo-map.component";
import {TeilgruppeParticipantsEditorComponent} from "./plan/teilgruppe-participants-editor/teilgruppe-participants-editor.component";
import {AuthService} from "./services/auth-service.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {WelcomeComponent} from "./perspectives/welcome/welcome.component";
import {AlertListenerComponent} from "./commons/alert-listener/alert-listener.component";
import {AlertService} from "./services/alert.service";
import {RemovalDialogComponent} from "./commons/removal-dialog/removal-dialog.component";
import {NotificatationDienstGroupPipe} from "./pipes/notificatation-group-by-dienst-plan-group.pipe";
import {NotificatationPersonGroupPipe} from "./pipes/notificatation-group-by-person.pipe";
import {NotificatationDienstPlanGroupPipe} from "./pipes/notificatation-group-by-plan.pipe";
import {FilterDisplayablePipe} from "./pipes/filter-displayable.pipe";
import {PlanPrintComponent} from "./plan/plan-print/plan-print.component";
import {ParticipantSearchComponent} from "./plan/participant-search/participant-search.component";
import {GruppeFlatPipe} from "./pipes/gruppe-flat.pipe";
import {PersonGroupRefPipe} from "./pipes/person-group-ref.pipe";
import {ListItemComponent} from "./commons/list-item/list-item.component";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {MaterializeModule} from "angular2-materialize";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    PlanDashboardComponent,
    GruppeViewComponent,
    GruppeEditorComponent,
    PlanEditorComponent,
    ViewCardComponent,
    ParticipantRefListViewComponent,
    PlanTableComponent,
    PersonDashboardComponent,
    PersonEditorComponent,
    AddressEditorComponent,
    PlanViewComponent,
    PlanNotificationViewComponent,
    PlanNavigationToolbarComponent,
    PlanNotificationProcessorComponent,
    OrderByPipe,
    NotificationSingleGroupPresenterComponent,
    PersonRefPipe,
    ParticipantFlatPipe,
    GeoMapComponent,
    TeilgruppeParticipantsEditorComponent,
    WelcomeComponent,
    AlertListenerComponent,
    RemovalDialogComponent,
    NotificatationDienstGroupPipe,
    NotificatationPersonGroupPipe,
    NotificatationDienstPlanGroupPipe,
    FilterDisplayablePipe,
    PlanPrintComponent,
    ParticipantSearchComponent,
    GruppeFlatPipe,
    PersonGroupRefPipe,
    ListItemComponent
  ],
  providers: [
    PlanPersistenceService,
    ParticipantPersistenceService,
    NotificationControlService,
    AddressPersistenceService,
    AlertService,
    AppStoreService,
    AuthService,
    AuthGuardService,
   // AUTH_PROVIDERS,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    {provide: APP_CONFIG, useValue: J316_CONFIG}
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule    ,
    AgmCoreModule.forRoot({
      //apiKey: J316_CONFIG.mapsAPI,
      apiKey: 'AIzaSyDxEGs76p175F19pK8Vf_rEzsJaP_BKoes',
      libraries: ["places"]
    }),
    HttpModule,
    routing,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}


