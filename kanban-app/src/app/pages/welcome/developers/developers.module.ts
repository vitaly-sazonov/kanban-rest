import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersComponent } from './developers.component';
import { MatCardModule } from '@angular/material/card';
import { DeveloperComponent } from './developer/developer.component';

@NgModule({
  declarations: [DevelopersComponent, DeveloperComponent],
  imports: [CommonModule, MatCardModule],
})
export class DevelopersModule {}
