import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { first, map } from 'rxjs';
import { appForms } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import { BoardPageComponent } from 'src/app/pages/board-page/board-page/board-page.component';
import { addBoard, addColumn } from 'src/app/redux/actions/boards.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { HttpService } from '../../services/http.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  formConstructor!: FormGroup;
  formAction!: Function;

  constructor(
    private store: Store,
    private http: HttpService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.modalService.selectedScheme$
      .pipe(
        map(formSelected => {
          switch (formSelected[0]) {
            case appForms.addBoard:
              this.formConstructor = new FormGroup({
                title: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required),
              });
              this.formAction = (payload: Board) =>
                addBoard({ board: payload });
              break;
            case appForms.addColumn:
              this.formConstructor = new FormGroup({
                title: new FormControl('', Validators.required),
              });
              this.formAction = (payload: Column) =>
                addColumn({
                  boardId: formSelected[1],
                  column: payload,
                });
              break;
          }
        }),
        first()
      )
      .subscribe();
  }

  keepSorting() {
    return 0;
  }

  submit() {
    [
      setVisibility({ isVisible: false }),
      this.formAction(this.getInputFields()),
    ].forEach(action => this.store.dispatch(action));
  }

  getInputFields() {
    console.log(this.formConstructor.value);
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
