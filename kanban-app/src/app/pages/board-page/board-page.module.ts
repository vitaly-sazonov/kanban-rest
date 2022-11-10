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

@NgModule({
  declarations: [BoardPageComponent],
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
  ],
})
export class BoardPageModule {}
