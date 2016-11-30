import {Component, OnInit, Input} from "@angular/core";
import {GeoMapDisplayable} from "../../model/GeoMapDisplayable";

@Component({
  selector: 'geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.css']
})
export class GeoMapComponent implements OnInit {

  @Input()
  private circleLocation: GeoMapDisplayable;

  @Input()
  private circleRadius: number = 10000;

  @Input()
  private markerLocations: Array<GeoMapDisplayable>;



  constructor() {
  }

  ngOnInit() {
  }

}
