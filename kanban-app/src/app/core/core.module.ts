import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    ToastComponent,
    ConfirmModalComponent,
    FormModalComponent,
  ],
  imports: [CommonModule, SharedModule,FormsModule, ReactiveFormsModule],
  exports: [FooterComponent, HeaderComponent, ModalComponent, ToastComponent],
})
export class CoreModule {}
