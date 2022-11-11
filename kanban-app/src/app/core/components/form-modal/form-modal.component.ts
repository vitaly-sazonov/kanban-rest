import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ModalSchemes } from 'src/app/enums';
import { Board, Column, Task } from 'src/app/interfaces';
import {
  addBoard,
  addColumn,
  addTask,
  deleteAllBoards,
  editColumn,
  editTask,
} from 'src/app/redux/actions/boards.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectModalScheme } from 'src/app/redux/selectors/modal.selectors';
import { HttpService } from '../../services/http.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit, OnDestroy {
  formScheme$ = this.store.select(selectModalScheme);
  formConstructor!: FormGroup;
  formAction!: Function;
  formSelected: ModalSchemes | undefined;
  inputFields = {};
  modalExtra: any[] = [];
  unsubscribe$ = new Subject();

  constructor(
    private store: Store,
    private http: HttpService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.formScheme$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.formSelected = data;
      this.buildForm(this.formSelected!);
    });
  }

  buildForm(formSelected: ModalSchemes) {
    this.modalService.extra$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.modalExtra = data;
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
                boardId: this.modalExtra[0],
                column: payload,
              });
            break;
          case ModalSchemes.editColumn:
            this.formConstructor = new FormGroup({
              title: new FormControl(this.modalExtra[3], Validators.required),
            });
            this.formAction = (payload: Column) =>
              editColumn({
                boardId: this.modalExtra[0],
                columnId: this.modalExtra[1],
                columnOrder: this.modalExtra[2],
                column: payload,
              });
            break;
          case ModalSchemes.addTask:
            this.formConstructor = new FormGroup({
              title: new FormControl('', Validators.required),
              description: new FormControl('', Validators.required),
            });
            this.formAction = (payload: Task) =>
              addTask({
                columnId: this.modalExtra[0],
                boardId: this.modalExtra[1],
                task: {
                  ...payload,
                  userId: `${this.modalExtra[2]}`,
                },
              });
            break;
          case ModalSchemes.editTask:
            this.formConstructor = new FormGroup({
              title: new FormControl(
                this.modalExtra[5].title,
                Validators.required
              ),
              description: new FormControl(
                this.modalExtra[5].description,
                Validators.required
              ),
            });
            this.formAction = (payload: Task) =>
              editTask({
                taskId: this.modalExtra[0],
                columnId: this.modalExtra[1],
                boardId: this.modalExtra[2],
                taskOrder: this.modalExtra[4],
                task: {
                  ...payload,
                  userId: `${this.modalExtra[3]}`,
                },
              });
            break;
        }
        this.inputFields = this.getInputFields();
      });
  }

  keepSorting() {
    return 0;
  }

  submit() {
    if (this.formSelected === ModalSchemes.addBoard) {
      this.store.dispatch(deleteAllBoards());
    }
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

  ngOnDestroy() {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}
