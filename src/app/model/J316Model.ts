import {UUID} from "angular2-uuid";
import {Map, List} from "immutable";

export class J316Model {

  private _data: Map<string, any>;

  constructor(data: any = {}) {
    if (!data.uuid) {
      data.uuid = J316Model.getUniqueIdentifier();
    }

    this._data = Map<string, any>(data);
  }


  /**
   * Generates a new uuid
   * @return {string}
   */
  static getUniqueIdentifier() {
    return UUID.UUID();
  }

  /**
   * Unique primary key of the entity
   * @return {any}
   */
  get uuid(): string {
    return this._data.get('uuid');
  }

  /**
   * Setter for the key. It returns the whole modified object back as immutable
   * @param ClassName
   * @param key
   * @param value
   * @return {T}
   */
  public setKey<T>(ClassName: any, key: string, value: any): T {
    return this.setData(ClassName, this._data.set(key, value)) as T;
  }

  /**
   * reads a given key from the object
   * @param key
   * @return {any}
   */
  public getKey(key: string) {
    return this._data.get(key);
  }

  /**
   * Returns the Immutable map as data storage
   * @return {Map<string, any>}
   */
  public getData(): Map<string, any> {
    return this._data;
  }

  /**
   * Updates whole data object of the model with a new one
   * @param ClassName
   * @param data
   * @return {T}
   */
  public setData<T>(ClassName, data: any): T {
    function ClassFactory(className: {new(data): T;}, data: any): T {
      var created: T = new className(Map<string, any>(data));
      return created;
    }

    return ClassFactory(ClassName, data);
  }


  /**
   * Create a List or update a list if one exists, with the Map key provided and the value to push to the new/updated list
   * @param ClassName
   * @param i_key
   * @param i_value
   * @returns {T}
   */
  public listPush<T>(ClassName, i_key: string, i_value: string): T {
    var value = this.getKey(i_key);
    var model: J316Model = this;
    if (!value)
      model = this.setKey<T>(ClassName, i_key, List<any>()) as any;
    var list: List<any> = model.getKey(i_key);
    list = list.push(i_value);
    return model.setKey<T>(ClassName, i_key, list) as T;
  }
}
