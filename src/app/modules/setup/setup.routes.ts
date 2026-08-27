import { Routes } from '@angular/router';

import { Setup as SetupComponent } from './components/setup/setup';

import { setupGuard } from '../../core/guards/setup/setup-guard';

export const setupRoutes: Routes = [
  {
    path: '',
    component: SetupComponent,
    canActivate: [setupGuard],
    data: { title: 'SETUP_PAGE.TITLE' },
  },
];
