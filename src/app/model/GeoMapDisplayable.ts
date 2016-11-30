import {PostalAddress} from "./PostalAddress";
/**
 * Interface to display a point on the map
 */
export interface GeoMapDisplayable {

  getTitle();
  getDescription();
  address: PostalAddress

}
