import {Injectable} from "@angular/core";
import {tokenNotExpired} from "angular2-jwt";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable()
export class AuthService {

  private _authSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public authEvent: Observable<any> = this._authSubject.asObservable();

  public userProfile: any;

  lock = new Auth0Lock('J2NTOuFFPfJTzMsbgspctEgdbZ0YGWYx', 'j316.eu.auth0.com', {});

  constructor() {
    let profile = localStorage.getItem('profile');
    if (profile) {
      this.userProfile = JSON.parse(profile);
    }
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this._authSubject.next({authentication: true});
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this._authSubject.next({authentication: false});
  };
}
