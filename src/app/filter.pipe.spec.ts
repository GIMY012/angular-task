import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterTerm: string): any[] {
    if (!items) {
      return [];
    }
    if (!filterTerm) {
      return items;
    }
    filterTerm = filterTerm.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(filterTerm);
    });
  }
}
