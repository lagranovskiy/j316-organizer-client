import { Routes, RouterModule } from "@angular/router";
import { PersonHomeComponent } from "./person-home/person-home.component";
import { PersonDetailComponent } from "./person-detail/person-detail.component";
import { PersonListComponent } from './person-list/person-list.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';


const routes: Routes = [
    {
        component: DashboardHomeComponent,
        path: ''
    },
    {
        path: 'person',
        component: PersonHomeComponent,

    },
    {
        path: 'person/:id',
        component: PersonDetailComponent
    },
    {
        path: 'persons',
        component: PersonListComponent
    }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: false });
