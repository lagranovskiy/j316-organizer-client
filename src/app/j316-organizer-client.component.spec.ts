import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { J316OrganizerClientAppComponent } from '../app/j316-organizer-client.component';

beforeEachProviders(() => [J316OrganizerClientAppComponent]);

describe('App: J316OrganizerClient', () => {
  it('should create the app',
      inject([J316OrganizerClientAppComponent], (app: J316OrganizerClientAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'j316-organizer-client works!\'',
      inject([J316OrganizerClientAppComponent], (app: J316OrganizerClientAppComponent) => {
    expect(app.title).toEqual('j316-organizer-client works!');
  }));
});
