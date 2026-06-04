import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
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
    path: ':category/:forum/new',
    renderMode: RenderMode.Server,
  },
  {
    path: ':category/:forum/:discussion',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
