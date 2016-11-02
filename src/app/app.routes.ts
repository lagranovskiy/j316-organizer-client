import {Routes, RouterModule} from "@angular/router";
import {PlanDashboardComponent} from "./perspectives/plan-dashboard/plan-dashboard.component";
import {PlanEditorComponent} from "./perspectives/plan-editor/plan-editor.component";

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
    component: PlanEditorComponent,
    path: 'plan/:uid'
  }

];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
