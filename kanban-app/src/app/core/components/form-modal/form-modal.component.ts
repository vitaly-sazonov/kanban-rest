import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { addBoard } from 'src/app/redux/actions/boards.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent {
  createBoardForm: FormGroup;
  board: Board = { title: '', description: '' };

  constructor(private store: Store, private http: HttpService) {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  get _title() {
    return this.createBoardForm.get('title');
  }
  get _description() {
    return this.createBoardForm.get('description');
  }

  submit() {
    this.board = this.getBoard();
    [
      setVisibility({ isVisible: false }),
      addBoard({ board: this.board }),
    ].forEach(action => this.store.dispatch(action));
  }

  getBoard() {
    return {
      title: this.createBoardForm.controls['title'].value,
      description: this.createBoardForm.controls['description'].value,
    };
  }
}
