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
    path: 'forum-settings',
    loadChildren: () =>
      import('./modules/forum-settings/forum-settings.routes').then(
        (m) => m.forumSettingsRoutes,
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.routes').then(
        (m) => m.settingsRoutes,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/forum/forum.routes').then((m) => m.forumRoutes),
  },
];
