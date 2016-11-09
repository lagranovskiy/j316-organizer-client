import {Component, OnInit, Input, ElementRef, ViewChild} from "@angular/core";
import {PostalAddress} from "../../model/PostalAddress";
import {MapsAPILoader} from "angular2-google-maps/core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.css']
})
export class AddressEditorComponent implements OnInit {

  @Input()
  private address: PostalAddress = new PostalAddress();

  private zoom: number;
  private latitude: number;
  private longitude: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

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

        //set latitude and longitude
        this.address.location = place.formatted_address;
        if (place.geometry && place.geometry.location) {
          this.address.latitude = place.geometry.location.lat();
          this.address.longitude = place.geometry.location.lng();

          let country = place.address_components.find(component => component.types.indexOf('country') >= 0);
          if (country) {
            this.address.country = country.long_name;
          }

          let city = place.address_components.find(component => component.types.indexOf('political') >= 0);
          if (city) {
            this.address.city = city.long_name;
          }

          let route = place.address_components.find(component => component.types.indexOf('route') >= 0);

          if (route) {
            this.address.street = route.long_name;
          }
          let street_number = place.address_components.find(component => component.types.indexOf('street_number') >= 0);
          if (street_number) {
            this.address.street = this.address.street + ' ' + street_number.long_name;
          }

          let postal_code = place.address_components.find(component => component.types.indexOf('postal_code') >= 0);
          if (postal_code) {
            this.address.zip = postal_code.long_name;
          }
        }
      });
    });
  }

}
