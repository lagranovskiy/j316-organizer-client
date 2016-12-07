import {Component, OnInit, Input} from "@angular/core";
import {GeoMapDisplayable} from "../../model/interfaces/GeoMapDisplayable";

@Component({
  selector: 'geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.css']
})
export class GeoMapComponent implements OnInit {

  @Input()
  private circleLocations: Array<GeoMapDisplayable> = [];

  @Input()
  private circleRadius: number = 10000;

  @Input()
  private zoom: number = 11;

  @Input()
  private markerLocations: Array<GeoMapDisplayable> = [];

  @Input()
  private markerLocationGroups: Array<Array<GeoMapDisplayable>>;

  private test;

  private colorArray: Array<string> = ['blue', 'green', 'grey', 'orange', 'purple', 'red', 'white', 'yellow', 'black'];
  private markerArray: Array<string> = ['blue.png', 'green.png', 'grey.png', 'orange.png', 'purple.png', 'red.png', 'white.png', 'yellow.png', 'black.png'];

  constructor() {
  }

  ngOnInit() {
  }

}
