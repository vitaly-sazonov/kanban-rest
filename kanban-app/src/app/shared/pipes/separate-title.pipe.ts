import { Pipe, PipeTransform } from '@angular/core';
import { SPECIAL_SYMBOL } from 'src/app/constants';

@Pipe({
  name: 'separateTitle',
})
export class SeparateTitlePipe implements PipeTransform {
  transform(value: string) {
    let reg = new RegExp(`^(.*?)${SPECIAL_SYMBOL}`);
    return value.includes(SPECIAL_SYMBOL)
      ? value.match(reg)![0].replace(SPECIAL_SYMBOL, '')
      : value;
  }
}
