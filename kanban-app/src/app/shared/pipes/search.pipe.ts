import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/core/services/http.service';
import { Board } from 'src/app/interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(private store: Store, private http: HttpService) {}

  transform(array: Board[], inputString: string): Board[] | [] {
    let output: Board[] = [];
    let input = inputString.toLocaleLowerCase();

    if (inputString.trim() === '') {
      return array;
    }
    output = array.filter(item => {
      return (
        item?.title?.toLowerCase().includes(input) ||
        item?.description?.toLowerCase().includes(input) ||
        item?.columns?.some(
          column =>
            column?.title?.toLowerCase().includes(input) ||
            column?.tasks?.some(
              task =>
                task?.title?.toLowerCase().includes(input) ||
                task?.description?.toLowerCase().includes(input)
            )
        )
      );
    });

    return output;
  }
}
