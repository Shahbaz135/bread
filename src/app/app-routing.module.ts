import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthGuard } from './services/common/auth.guard';

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
        canActivate: [AuthGuard],
        component: AccountLayoutComponent,
        loadChildren: () =>
          import('./pages/account/account.module').then((m) => m.AccountModule),
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: `**`,
    redirectTo: ``
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
