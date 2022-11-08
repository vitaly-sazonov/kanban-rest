import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, from, map, of, switchMap, tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Board, Column } from 'src/app/interfaces';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(private store: Store, private http: HttpService) {}

  transform(array: Board[], inputString: string): Board[] | [] {
    let output: Board[] = [];
    if (inputString.trim() === '') {
      return array;
    }
    output = array.filter(item => {
      return (
        item.title.toLowerCase().includes(inputString.toLowerCase()) ||
        item.description.toLowerCase().includes(inputString.toLowerCase()) 
        //this.deepSearch(item, inputString)
      );
    });

    return output;
  }

  deepSearch(board: Board, searchInput: string) {
    return of(board.id).pipe(
      switchMap(id => this.http.getColumns(id)),
      switchMap((columns: Column[]) => from(columns)),
      filter(
        column =>
          column?.title?.includes(searchInput) ||
          !!column?.tasks?.some(item => item?.title?.includes(searchInput)) ||
          !!column?.tasks?.some(item =>
            item?.description?.includes(searchInput)
          )
      ),
      map(obs => {
        if (obs) return true;
        else return false;
      })
    );
  }
}
