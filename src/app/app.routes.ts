import { Routes, RouterModule } from "@angular/router";
import {AppComponent} from './app.component';

const routes: Routes = [
    {
        component: AppComponent,
        path: ''
    }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: false });
