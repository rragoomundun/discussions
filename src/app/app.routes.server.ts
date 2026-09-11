import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'setup',
    renderMode: RenderMode.Client,
  },
  {
    path: 'auth/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'forum-settings/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'settings/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'user/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search',
    renderMode: RenderMode.Client,
  },
  {
    path: ':category',
    renderMode: RenderMode.Server,
  },
  {
    path: ':category/:forum',
    renderMode: RenderMode.Server,
  },
  {
    path: ':category/:forum/:discussion',
    renderMode: RenderMode.Server,
  },
  {
    path: 'discussion/:discussionId/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'message/:messageId/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: ':category/:forum/new',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
