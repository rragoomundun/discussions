import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'setup',
    loadChildren: () =>
      import('./modules/setup/setup.routes').then((m) => m.setupRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.routes').then((m) => m.homeRoutes),
  },
];
