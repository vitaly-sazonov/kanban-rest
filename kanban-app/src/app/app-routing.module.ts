import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'board/:id',
    loadChildren: () =>
      import('./pages/board-page/board-page.module').then(m => m.BoardPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // { enableTracing: true }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
