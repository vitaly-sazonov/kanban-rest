import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { loadBoards } from 'src/app/redux/actions/boards.actions';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$ = this.store.select(selectUserBoards);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  constructor(private store: Store, private http: HttpService) {}

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }
}
