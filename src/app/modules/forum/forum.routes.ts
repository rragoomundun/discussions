import { Routes } from '@angular/router';

import { ForumHome as ForumHomeComponent } from './components/forum-home/forum-home';
import { CategoryHome as CategoryHomeComponent } from './components/category-home/category-home';
import { Forum as ForumComponent } from './components/forum/forum';
import { Discussion as DiscussionComponent } from './components/discussion/discussion';
import { NewDiscussion as NewDiscussionComponent } from './components/new-discussion/new-discussion';
import { EditDiscussion as EditDiscussionComponent } from './components/edit-discussion/edit-discussion';
import { EditMessage as EditMessageComponent } from './components/edit-message/edit-message';

import { authGuard } from '../../core/guards/auth/auth-guard';

export const forumRoutes: Routes = [
  {
    path: '',
    component: ForumHomeComponent,
    data: { title: 'FORUM_HOME_PAGE.TITLE' },
  },
  {
    path: 'discussion/:discussionId/edit',
    component: EditDiscussionComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'message/:messageId/edit',
    component: EditMessageComponent,
    // canActivate: [authGuard],
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
    path: ':category/:forum/new',
    component: NewDiscussionComponent,
    data: { title: 'DISCUSSION_PAGE.NEW_DISCUSSION' },
    // canActivate: [authGuard],
  },
  {
    path: ':category/:forum/:discussion',
    component: DiscussionComponent,
  },
];
