import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardPageRoutingModule } from './board-page-routing.module';
import { BoardPageComponent } from './board-page/board-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortByPipe } from './pipes/sort-by-order.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BoardPageComponent, SortByPipe],
  imports: [
    CommonModule,
    BoardPageRoutingModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
  ],
})
export class BoardPageModule {}
