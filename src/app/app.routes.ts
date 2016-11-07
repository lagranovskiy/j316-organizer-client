import {Routes, RouterModule} from "@angular/router";
import {PlanDashboardComponent} from "./perspectives/plan-dashboard/plan-dashboard.component";
import {PlanEditorComponent} from "./perspectives/plan-editor/plan-editor.component";
import {PersonDashboardComponent} from "./perspectives/person-dashboard/person-dashboard.component";
import {PersonEditorComponent} from "./perspectives/person-editor/person-editor.component";

const routes: Routes = [
  {
    component: PlanDashboardComponent,
    path: ''
  },

  {
    component: PlanEditorComponent,
    path: 'plan'
  },
  {
    component: PlanDashboardComponent,
    path: 'plan/all'
  },
  {
    component: PlanEditorComponent,
    path: 'plan/:uuid'
  },

  {
    component: PersonDashboardComponent,
    path: 'person/all'
  },
  {
    component: PersonEditorComponent,
    path: 'person/'
  },
  {
    component: PersonEditorComponent,
    path: 'person/:uuid'
  }

];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
