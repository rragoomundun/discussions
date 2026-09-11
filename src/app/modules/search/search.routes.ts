import { Routes } from '@angular/router';

import { Search as SearchComponent } from './components/search/search';

export const searchRoutes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: { title: 'SEARCH_PAGE.TITLE' },
  },
];
