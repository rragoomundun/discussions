import { Routes } from '@angular/router';

import { ForumSettings as ForumSettingsComponent } from './components/forum-settings/forum-settings';
import { Configuration as ConfigurationComponent } from './components/configuration/configuration';
import { Forums as ForumsComponent } from './components/forums/forums';
import { BottomLinks as BottomLinksComponent } from './components/bottom-links/bottom-links';

export const forumSettingsRoutes: Routes = [
  {
    path: '',
    component: ForumSettingsComponent,
    children: [
      {
        path: 'general',
        component: ConfigurationComponent,
        data: { title: 'FORUM_SETTINGS_PAGE.CONFIGURATION_PAGE.TITLE' },
      },
      {
        path: 'forums',
        component: ForumsComponent,
        data: { title: 'FORUM_SETTINGS_PAGE.FORUMS_PAGE.TITLE' },
      },
      {
        path: 'bottom-links',
        component: BottomLinksComponent,
        data: { title: 'FORUM_SETTINGS_PAGE.BOTTOM_LINKS_PAGE.TITLE' },
      },
      {
        path: '**',
        redirectTo: 'general',
      },
    ],
  },
];
