import {Routes, RouterModule} from "@angular/router";
import {PersonListComponent} from "./personlist/PersonList.component";


const routes: Routes = [
    {
        path: '', component: PersonListComponent
    },
    {
        path: '**', redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
