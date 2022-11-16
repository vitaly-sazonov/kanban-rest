import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LAST_SEARCH } from 'src/app/constants';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import {
  deleteAllBoards,
  loadBoards,
} from 'src/app/redux/actions/boards.actions';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$? = this.store.select(selectUserBoards);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  searchRequest = this.storage.getItem(LAST_SEARCH) || '';
  isAllShort = false;
  isReverseBoards = false;

  constructor(private store: Store, private storage: LocalstorageService) {}

  ngOnInit(): void {
    this.reset();
  }
  reset(): void {
    [deleteAllBoards(), loadBoards()].forEach(action =>
      this.store.dispatch(action)
    );
  }
  deleteSearch() {
    this.searchRequest = '';
    this.rememberSearch();

  }
  rememberSearch() {
    this.storage.setItem(LAST_SEARCH, this.searchRequest);
  }
}  
