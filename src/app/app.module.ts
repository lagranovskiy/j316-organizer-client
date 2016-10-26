import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AlertModule} from "ng2-bootstrap/ng2-bootstrap";
import {InputTextModule, ButtonModule} from "primeng/primeng";
import {AppStore} from "angular2-redux-util";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AlertModule,
        InputTextModule, ButtonModule,
        routing
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}


