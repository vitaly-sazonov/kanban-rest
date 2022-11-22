import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DevelopersModule } from './developers/developers.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    WelcomeComponent,
    RegistrationComponent,
    LoginComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    DevelopersModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class WelcomeModule {}
