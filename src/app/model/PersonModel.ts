import {StoreModel} from "./StoreModel";

/**
 * Person Model
 */
export class PersonModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    /**
     * Returns the name of the person
     */
    public get name(): string {
        return this.getKey("name");
    }

    public set name(name: string) {
        this.setKey<PersonModel>(PersonModel, 'name', name) as PersonModel;
    }

    /**
     * Returns the surname of the person
     */
    public get surname(): string {
        return this.getKey("surname");
    }

    public set surname(surname: string) {
        this.setKey<PersonModel>(PersonModel, 'surname', surname) as PersonModel;
    }
}
