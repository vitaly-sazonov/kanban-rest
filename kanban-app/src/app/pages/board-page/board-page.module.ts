import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardPageRoutingModule } from './board-page-routing.module';
import { BoardPageComponent } from './board-page/board-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, BoardPageRoutingModule, TranslateModule],
})
export class BoardPageModule {}
