import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'board/:id',
    loadChildren: () =>
      import('./pages/board-page/board-page.module').then(
        m => m.BoardPageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      //  { enableTracing: true }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
