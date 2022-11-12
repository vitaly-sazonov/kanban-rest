import { Pipe, PipeTransform } from '@angular/core';
import { Column } from 'src/app/interfaces';

@Pipe({
  name: 'order',
})
export class OrderPipe implements PipeTransform {
  transform(array: Column[] | undefined) {
    let out = [...array!];
    out!.sort((a, b) => a?.order! - b?.order!);
    return out;
  }
}
