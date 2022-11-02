import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ModalTypes } from 'src/app/enums';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectFeatureUserLoggedIn } from 'src/app/redux/selectors/user.selectors';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  createBoard = 'CREATE_BOARD';
  isUserLogged$= this.store.select(selectFeatureUserLoggedIn)
  constructor(
    private translateService: TranslateService,
    private modalService :ModalService,
    private store:Store
    
  ) {}

  setLang(lang: string) {
    this.translateService.use(lang);
  }

  callFormModal(){
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
    
  }
}
