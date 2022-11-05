import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
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
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
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
