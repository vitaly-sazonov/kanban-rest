import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteAllBoards,
  loadBoards,
} from 'src/app/redux/actions/boards.actions';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$ = this.store.select(selectUserBoards);
  searchRequest = '';
  constructor(private store: Store) {}

  ngOnInit(): void {
    [deleteAllBoards(), loadBoards()].forEach(action =>
      this.store.dispatch(action)
    );
  }
}
