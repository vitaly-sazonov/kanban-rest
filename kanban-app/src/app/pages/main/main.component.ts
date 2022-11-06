import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/core/services/http.service';
import { RequestService } from 'src/app/core/services/request.service';
import { loadBoards } from 'src/app/redux/actions/boards.actions';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  boards$ = this.store.select(selectUserBoards);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  searchRequest = '';
  constructor(
    private store: Store,
    private request: RequestService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  search() {
    this.request.setRequest(this.searchRequest)
  }
}
