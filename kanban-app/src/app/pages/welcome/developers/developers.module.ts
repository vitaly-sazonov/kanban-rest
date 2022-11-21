import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersComponent } from './developers.component';
import { MatCardModule } from '@angular/material/card';
import { DeveloperComponent } from './developer/developer.component';
import { BlobComponent } from './blob/blob.component';

@NgModule({
  declarations: [DevelopersComponent, DeveloperComponent, BlobComponent],
  imports: [CommonModule, MatCardModule],
})
export class DevelopersModule {}
