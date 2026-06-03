import { Routes } from '@angular/router';

import { ForumHome as ForumHomeComponent } from './components/forum-home/forum-home';
import { CategoryHome as CategoryHomeComponent } from './components/category-home/category-home';
import { Forum as ForumComponent } from './components/forum/forum';
import { Discussion as DiscussionComponent } from './components/discussion/discussion';

export const forumRoutes: Routes = [
  {
    path: '',
    component: ForumHomeComponent,
    data: { title: 'FORUM_HOME_PAGE.TITLE' },
  },
  {
    path: ':category',
    component: CategoryHomeComponent,
  },
  {
    path: ':category/:forum',
    component: ForumComponent,
  },
  {
    path: ':category/:forum/:discussion',
    component: DiscussionComponent,
  },
];
