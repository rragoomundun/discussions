import { Routes } from '@angular/router';

import { Profile as ProfileComponent } from './components/profile/profile';
import { Informations as InformationsComponent } from './components/informations/informations';
import { Discussions as DiscussionsComponent } from './components/discussions/discussions';
import { Messages as MessagesComponent } from './components/messages/messages';

export const userRoutes: Routes = [
  {
    path: ':id',
    component: ProfileComponent,
    children: [
      {
        path: 'informations',
        component: InformationsComponent,
        data: { title: 'USER_PAGE.INFORMATIONS_PAGE.TAB_NAME' },
      },
      {
        path: 'discussions',
        component: DiscussionsComponent,
        data: { title: 'USER_PAGE.DISCUSSIONS_PAGE.TAB_NAME' },
      },
      {
        path: 'messages',
        component: MessagesComponent,
        data: { title: 'USER_PAGE.MESSAGES_PAGE.TAB_NAME' },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'informations',
      },
      {
        path: '**',
        redirectTo: 'informations',
      },
    ],
  },
];
