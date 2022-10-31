import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ModalComponent,
    ToastComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [FooterComponent, HeaderComponent, ModalComponent, ToastComponent],
})
export class CoreModule {}
