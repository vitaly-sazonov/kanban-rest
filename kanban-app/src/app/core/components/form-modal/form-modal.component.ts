import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ModalSchemes } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import { addBoard, addColumn } from 'src/app/redux/actions/boards.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectModalScheme } from 'src/app/redux/selectors/modal.selectors';
import { HttpService } from '../../services/http.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  formScheme$ = this.store.select(selectModalScheme);
  formConstructor!: FormGroup;
  formAction!: Function;
  formSelected: ModalSchemes | undefined;
  inputFields = {};
  boardId = '';

  constructor(
    private store: Store,
    private http: HttpService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.formScheme$.subscribe(data => {
      this.formSelected = data;
      this.buildForm(this.formSelected!);
    });
    this.modalService.extra$.subscribe(data => (this.boardId = data[0]));
  }

  buildForm(formSelected: ModalSchemes) {
    switch (formSelected) {
      case ModalSchemes.addBoard:
        this.formConstructor = new FormGroup({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
        });
        this.formAction = (payload: Board) => addBoard({ board: payload });
        break;
      case ModalSchemes.addColumn:
        this.formConstructor = new FormGroup({
          title: new FormControl('', Validators.required),
        });
        this.formAction = (payload: Column) =>
          addColumn({
            boardId: this.boardId,
            column: payload,
          });
        break;
    }
    this.inputFields = this.getInputFields();
  }

  keepSorting() {
    return 0;
  }

  submit() {
    const payload = this.getInputFields();
    [setVisibility({ isVisible: false }), this.formAction(payload)].forEach(
      action => this.store.dispatch(action)
    );
  }

  getInputFields() {
    const currentForm = {};
    Object.keys(this.formConstructor.value).forEach(el => {
      Object.assign(currentForm, {
        [el]: this.formConstructor.controls[el].value,
      });
    });
    return currentForm;
  }

  checkForErrors(key: string) {
    const input = this.formConstructor.get(key);
    return input?.errors && input.touched ? true : false;
  }
}
