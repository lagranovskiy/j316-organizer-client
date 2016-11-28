import {Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output} from "@angular/core";
import {PostalAddress} from "../../model/PostalAddress";
import {MapsAPILoader} from "angular2-google-maps/core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.css']
})
export class AddressEditorComponent implements OnInit {

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @Input()
  private address: PostalAddress = new PostalAddress();

  @Output()
  public addressChanged: EventEmitter<any> = new EventEmitter<any>();

  private zoom: number;
  private latitude: number;
  private longitude: number;



  public searchControl: FormControl = new FormControl();

  constructor(private mapsAPILoader: MapsAPILoader) {
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
        types: ['address'],
        componentRestrictions: {country: 'de'}
      });
      autocomplete.addListener("place_changed", () => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        let event : any= {};

        //set latitude and longitude
        event.location = place.formatted_address;
        if (place.geometry && place.geometry.location) {
          event.latitude = place.geometry.location.lat();
          event.longitude = place.geometry.location.lng();

          let country = place.address_components.find(component => component.types.indexOf('country') >= 0);
          if (country) {
            event.country = country.long_name;
          }

          let city = place.address_components.find(component => component.types.indexOf('political') >= 0);
          if (city) {
            event.city = city.long_name;
          }

          let route = place.address_components.find(component => component.types.indexOf('route') >= 0);

          if (route) {
            event.street = route.long_name;
          }
          let street_number = place.address_components.find(component => component.types.indexOf('street_number') >= 0);
          if (street_number) {
            event.street = this.address.street + ' ' + street_number.long_name;
          }

          let postal_code = place.address_components.find(component => component.types.indexOf('postal_code') >= 0);
          if (postal_code) {
            event.zip = postal_code.long_name;
          }
        }

        this.addressChanged.emit(event);
      });
    });
  }

}
