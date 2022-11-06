import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appForms } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import { addBoard } from 'src/app/redux/actions/boards.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  formConstructor!: FormGroup;
  payload = {};

  @Input() formSelected = 'addBoard';

  constructor(private store: Store, private http: HttpService) {}

  ngOnInit() {
    switch (this.formSelected) {
      case appForms.addBoard:
        this.formConstructor = new FormGroup({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
        });
        break;
      case appForms.addColumn:
        this.formConstructor = new FormGroup({
          title: new FormControl('', Validators.required),
        });
        break;
    }
  }

  keepSorting() {
    return 0;
  }

  submit() {
    this.payload = this.getInputFields();
    [
      setVisibility({ isVisible: false }),
      addBoard({ board: this.payload }),
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
