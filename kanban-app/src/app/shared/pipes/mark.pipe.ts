import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mark',
})
export class MarkPipe implements PipeTransform {
  transform(input: string, search: string) {
    let output = input;

    if (search.trim() === '') {
      return output;
    } else {
      let matching = input.match(RegExp(search, 'i')) || [''];
      return output.replace(
        RegExp(matching![0], 'gi'),
        `<mark>${matching![0]}</mark>`
      );
    }
  }
}
