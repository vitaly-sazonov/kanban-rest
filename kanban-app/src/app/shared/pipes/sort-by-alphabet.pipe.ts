import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/interfaces';

@Pipe({
  name: 'sortByAlphabet',
})
export class SortByAlphabetPipe implements PipeTransform {
  transform(board: Board[], reverse: boolean): Board[] {
    let out = [...board];

    out = out.sort((a, b) => {
      let x = a?.title?.toLowerCase()!;
      let y = b?.title?.toLowerCase()!;
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      if (x === y) {
        return 0;
      }
      return 0;
    });

    return reverse ? out.reverse() : out;
  }
}
