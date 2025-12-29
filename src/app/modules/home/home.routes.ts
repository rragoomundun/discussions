import { Routes } from '@angular/router';

import { Home as HomeComponent } from './components/home/home';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'HOME_PAGE.TITLE' },
  },
];
