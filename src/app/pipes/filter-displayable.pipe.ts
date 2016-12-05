import {Pipe, PipeTransform} from "@angular/core";
import {DisplayableModel} from "../model/interfaces/DisplayableModel";

@Pipe({
  name: 'filterDisplayable'
})
export class FilterDisplayablePipe implements PipeTransform {

  transform(value: Array<DisplayableModel>, filterString: string): any {
    if (filterString && filterString.length > 0) {
      return value.filter(plan=>plan.getTitle().indexOf(filterString) > -1 || plan.getDescription().indexOf(filterString) > -1);
    }
    return value;
  }

}
