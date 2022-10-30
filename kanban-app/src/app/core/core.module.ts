import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports:[ModalComponent]
})
export class CoreModule { }
