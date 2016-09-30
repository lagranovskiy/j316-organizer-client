export class J316OrganizerClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('j316-organizer-client-app h1')).getText();
  }
}
