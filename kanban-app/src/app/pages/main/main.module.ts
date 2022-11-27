import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CustomBoardComponent } from './components/custom-board/custom-board.component';
import { SelectBoardDialogComponent } from './components/select-board-dialog/select-board-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BasketComponent } from './components/basket/basket.component';
import { BasketBoardComponent } from './components/basket-board/basket-board.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormModalComponent } from 'src/app/core/components/form-modal/form-modal.component';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';

@NgModule({
  declarations: [
    MainComponent,
    BoardComponent,
    CustomBoardComponent,
    SelectBoardDialogComponent,
    BasketComponent,
    BasketBoardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatSidenavModule,
  ],
})
export class MainModule {}
