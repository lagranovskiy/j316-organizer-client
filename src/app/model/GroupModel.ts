import {StoreModel} from "./StoreModel";

/**
 * Person Model
 */
export class GroupModel extends StoreModel {

    constructor(data: any = {}) {
        super(data);
    }

    /**
     * Returns the name of the person
     */
    public get groupName(): string {
        return this.getKey("groupName");
    }

    public set groupName(groupName: string) {
        this.setKey<GroupModel>(GroupModel, 'groupName', groupName) as GroupModel;
    }

}
