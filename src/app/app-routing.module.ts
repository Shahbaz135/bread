import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'en',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/static/static.module').then((m) => m.StaticModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./pages/account/account.module').then((m) => m.AccountModule),
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
