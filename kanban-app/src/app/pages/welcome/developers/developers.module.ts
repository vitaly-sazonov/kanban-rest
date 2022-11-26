import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersComponent } from './developers.component';
import { MatCardModule } from '@angular/material/card';
import { DeveloperComponent } from './developer/developer.component';
import { BlobComponent } from './blob/blob.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DevelopersComponent, DeveloperComponent, BlobComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class DevelopersModule {}
