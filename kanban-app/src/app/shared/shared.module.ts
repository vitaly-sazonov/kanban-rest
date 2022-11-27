import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SearchPipe } from './pipes/search.pipe';
import { OrderPipe } from './pipes/oder.pipe';
import { MarkPipe } from './pipes/mark.pipe';
import { SortByAlphabetPipe } from './pipes/sort-by-alphabet.pipe';
import { SeparateTitlePipe } from './pipes/separate-title.pipe';
import { SeparatePicNamePipe } from './pipes/separate-pic-name.pipe';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SearchPipe,
    OrderPipe,
    MarkPipe,
    SortByAlphabetPipe,
    SeparateTitlePipe,
    SeparateTitlePipe,
    SeparatePicNamePipe,
  ],
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule],
  exports: [
    SearchPipe,
    OrderPipe,
    MarkPipe,
    SortByAlphabetPipe,
    SeparateTitlePipe,
    SeparatePicNamePipe,
  ],
})
export class SharedModule {}
