import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [FooterComponent, HeaderComponent,ConfirmModalComponent,
    FormModalComponent,ModalComponent,ToastComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule, 
    MatIconModule,
    
  ],
  exports: [FooterComponent, HeaderComponent,ModalComponent,ToastComponent],
})
export class CoreModule {}
