import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../core/components/toast/toast.component';
import { ModalComponent } from '../core/components/modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModalComponent, ToastComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ModalComponent, ToastComponent],
})
export class SharedModule {}
