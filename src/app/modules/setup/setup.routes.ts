import { Routes } from '@angular/router';

import { Setup as SetupComponent } from './components/setup/setup';

export const setupRoutes: Routes = [
  {
    path: '',
    component: SetupComponent,
    data: { title: 'SETUP_PAGE.TITLE' },
  },
];
