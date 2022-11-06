import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { DevelopersComponent } from './developers/developers.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'developers', pathMatch: 'full' },
      { path: 'developers', component: DevelopersComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'edit',
        component: UpdateUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
