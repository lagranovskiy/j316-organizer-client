import {Pipe, PipeTransform} from "@angular/core";
import {DisplayableModel} from "../model/interfaces/DisplayableModel";


@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

    transform(array: Array<DisplayableModel>, args: any): any {

        let retVal =  array.sort((a, b) => {
            if (a.getTitle() > b.getTitle()) {
                return 1;
            } else if (a.getTitle() < b.getTitle()) {
                return -1;
            } else {
                return 0;
            }
        });

        return retVal;
    }

}
