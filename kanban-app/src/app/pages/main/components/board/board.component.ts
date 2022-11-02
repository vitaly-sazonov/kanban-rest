import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { deleteBoardById } from 'src/app/redux/actions/boards.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board?: Board;
  constructor( private store:Store) {}

  ngOnInit(): void {}
  deleteBoard(id:string) {
    this.store.dispatch(deleteBoardById({id}))
  }
}
