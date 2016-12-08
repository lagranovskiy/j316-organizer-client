import {Pipe, PipeTransform} from "@angular/core";
import {DisplayableModel} from "../model/interfaces/DisplayableModel";

@Pipe({
  name: 'filterDisplayable'
})
export class FilterDisplayablePipe implements PipeTransform {

  transform(value: Array<DisplayableModel>, filterString: string): any {
    if (filterString && filterString.length > 0) {
      return value.filter(plan => {
        if(!plan.getTitle){
          return false;
        }

        return plan.getTitle().toLowerCase().indexOf(filterString.toLowerCase()) > -1 || plan.getDescription().toLowerCase().indexOf(filterString.toLowerCase()) > -1
      });
    }
    return value;
  }

}
