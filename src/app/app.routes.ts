import { Routes, RouterModule } from "@angular/router";
import {PlanDashboardComponent} from './plan-dashboard/plan-dashboard.component';

const routes: Routes = [
    {
        component: PlanDashboardComponent,
        path: ''
    }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: false });
