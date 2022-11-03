import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { addBoard, loadBoards } from 'src/app/redux/actions/boards.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  createBoardForm: FormGroup;
  board?: Board;
 
  constructor(private store: Store, private http:HttpService) {
    this.createBoardForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get _title(){
    return this.createBoardForm.get('title')
  }
  get _description(){
    return this.createBoardForm.get('description')
  }

  submit() {
    this.store.dispatch(setVisibility({ isVisible: false }));
    this.board = this.getBoard();
    this.store.dispatch(addBoard({board:this.board}))
    
  }
  getBoard() {
    return {
      title: this.createBoardForm.controls['title'].value,
      description: this.createBoardForm.controls['description'].value,
    };
  }
}
