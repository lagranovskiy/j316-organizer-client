import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { J316OrganizerClientAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(J316OrganizerClientAppComponent);
