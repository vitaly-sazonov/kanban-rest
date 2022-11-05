import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperComponent } from './developer/developer.component';
import { DevelopersComponent } from './developers.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DevelopersComponent, DeveloperComponent],
  imports: [CommonModule, MatCardModule],
  exports: [DevelopersComponent, DeveloperComponent],
})
export class DevelopersModule {}
