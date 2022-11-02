import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: string): string {
    return !key
      ? ''
      : key.split('.').length > 1
      ? key
          .split('.')
          .reduce((curr, next) => this.translate.data?.[curr]?.[next])
      : this.translate.data[key] || key;
  }
}
