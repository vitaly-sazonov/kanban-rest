import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
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
