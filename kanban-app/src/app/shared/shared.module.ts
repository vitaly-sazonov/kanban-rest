import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '../core/components/toast/toast.component';
import { ModalComponent } from '../core/components/modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [ConfirmDialogComponent, SearchPipe],
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  exports: [SearchPipe],
})
export class SharedModule {}
