import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'setup',
    loadChildren: () =>
      import('./modules/setup/setup.routes').then((m) => m.setupRoutes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.homeRoutes),
  },
];
