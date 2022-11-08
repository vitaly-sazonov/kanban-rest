import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(array: Board[], inputString: string): Board[] | [] {
    let output: Board[] = [];
    if (inputString.trim() === '') {
      return array;
    }
    output = array.filter(item => {
      return (
        item.title?.toLowerCase().includes(inputString.toLowerCase()) ||
        item.description?.toLowerCase().includes(inputString.toLowerCase())
      );
    });

    return output;
  }
}
