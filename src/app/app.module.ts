import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {InputTextModule, ButtonModule} from 'primeng/primeng';

import { NgReduxModule, NgRedux } from 'ng2-redux';
var createLogger = require('redux-logger');



import { AppComponent } from './app.component';
import { HelpComponent } from './help/help.component';
import {IAppState} from './store/IAppState';
import {rootReducerTest} from './store/StoreConfig';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    MaterialModule.forRoot(),
    AlertModule,
    InputTextModule, ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
     constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducerTest, {}, [ createLogger() ]);
  }
 }
