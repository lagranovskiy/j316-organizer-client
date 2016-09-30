import { J316OrganizerClientPage } from './app.po';

describe('j316-organizer-client App', function() {
  let page: J316OrganizerClientPage;

  beforeEach(() => {
    page = new J316OrganizerClientPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('j316-organizer-client works!');
  });
});
