import {Component} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {Router} from "@angular/router";


@Component({
    selector: 'j316-organizer',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private unsub;

    constructor(private router: Router, private appStore: AppStore) {
        this.unsub = appStore.sub((state: any)=> {
            console.info("Hey im AppComponent and got update!")
        }, 'persons')
  console.info("Hey im AppComponent initialized")
       // router.navigate(['/']);
    }

    private ngOnDestroy() {
        this.unsub();
    }


}
