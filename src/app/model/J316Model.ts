import {UUID} from "angular2-uuid";
import Immutable from "immutable";

export class J316Model {

  protected data: any;

  constructor(data: any) {
    this.data = data;

    if (!this.data.uuid) {
      this.data.uuid = this.getUniqueIdentifier();
    }

  }

  get uuid() {
    return this.data.uuid;
  }

  getUniqueIdentifier() {
    return UUID.UUID();
  }

  public getData() {
    return this.data;
  }

  protected cloneData(): any {
    return Immutable.Map(this.data).toObject();
  }
}
