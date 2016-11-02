import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {DienstPlanGruppe} from "../../model/DienstPlanGruppe";
import {Input} from "@angular/core/src/metadata/directives";
import {DienstPlanTeilgruppe} from "../../model/DienstPlanTeilgruppe";
import {ParticipantPersistenceService} from "../../participant-persistence.service";
import {MapsAPILoader} from "angular2-google-maps/core";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'gruppe-editor',
  templateUrl: './gruppe-editor.component.html',
  styleUrls: ['./gruppe-editor.component.css']
})
export class GruppeEditorComponent implements OnInit {

  @Input()
  private model: DienstPlanGruppe;

  private zoom:number;
  private latitude:number;
  private longitude:number;

  public searchControl: FormControl = new FormControl();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  private personList = this.personService.fetchParticipantFromStorage();


  constructor(private personService: ParticipantPersistenceService,  private mapsAPILoader: MapsAPILoader) {
  }

  addTeilgruppe() {
    this.model.sections.push(new DienstPlanTeilgruppe());
  }

  removeTeilgruppe(teilgruppe: DienstPlanTeilgruppe) {
    this.model.sections.splice(this.model.sections.indexOf(teilgruppe), 1);
  }



  ngOnInit() {
    /**
     * http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/
     * @type {number}
     */
    //set google maps defaults
    this.zoom = 10;
    this.latitude = 39.8282;
    this.longitude = -98.5795;


    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //set latitude and longitude
        this.model.location= place.formatted_address;
        this.model.latitude = place.geometry.location.lat();
        this.model.longitude = place.geometry.location.lng();
      });
    });
  }

}
