import {UUID} from "angular2-uuid";

export class J316Model {

  protected data: any;

  constructor(data: any) {
    this.data = data;

    if (!this.data.uid) {
      this.data.uid = this.getUniqueIdentifier();
    }

  }
  get uid() {
    return this.data.uid;
  }

  getUniqueIdentifier() {
    return UUID.UUID;
  }

  getData() {
    return this.data;
  }
}
