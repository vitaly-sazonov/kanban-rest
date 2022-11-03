import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardPageRoutingModule } from './board-page-routing.module';
import { BoardPageComponent } from './board-page/board-page.component';


@NgModule({
  declarations: [
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    BoardPageRoutingModule
  ]
})
export class BoardPageModule { }
