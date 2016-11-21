import {Routes, RouterModule} from "@angular/router";
import {PlanDashboardComponent} from "./perspectives/plan-dashboard/plan-dashboard.component";
import {PlanEditorComponent} from "./perspectives/plan-editor/plan-editor.component";
import {PersonDashboardComponent} from "./perspectives/person-dashboard/person-dashboard.component";
import {PersonEditorComponent} from "./perspectives/person-editor/person-editor.component";
import {PlanNotificationViewComponent} from "./perspectives/plan-notification-view/plan-notification-view.component";
import {PlanViewComponent} from "./perspectives/plan-view/plan-view.component";

const routes: Routes = [
  {
    component: PlanDashboardComponent,
    path: ''
  },
  {
    component: PlanDashboardComponent,
    path: 'plan/all'
  },

  {
    component: PlanViewComponent,
    path: 'plan/:uuid',
    children: [
      {path: '', redirectTo: 'edit', pathMatch: 'full'},
      {path: 'notification', component: PlanNotificationViewComponent},
      {path: 'edit', component: PlanEditorComponent}
    ]
  },


  {
    component: PersonDashboardComponent,
    path: 'person/all'
  },
  {
    component: PersonEditorComponent,
    path: 'person'
  },
  {
    component: PersonEditorComponent,
    path: 'person/:uuid'
  }

];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
