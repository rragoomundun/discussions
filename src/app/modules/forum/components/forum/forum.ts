import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { AsyncPipe } from '@angular/common';

import { ForumMetaData } from '../../../../shared/models/ForumMetaData';
import { Discussion as DiscussionModel } from '../../../../shared/models/Discussion';
import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';
import { User } from '../../../../shared/models/User';

import { DiscussionLink as DiscussionLinkComponent } from '../discussion-link/discussion-link';
import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { Forum as ForumService } from '../../../../shared/services/forum/forum';
import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';

import { AppState } from '../../../../shared/store/app.state';
import { selectUserModel } from '../../../../shared/store/user/user.selectors';

@Component({
  selector: 'app-forum',
  imports: [
    TranslateModule,
    RouterModule,
    AsyncPipe,
    DiscussionLinkComponent,
    PaginationComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './forum.html',
  styleUrl: './forum.scss',
})
export class Forum {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private forumService = inject(ForumService);
  private discussionService = inject(DiscussionService);
  private seoService = inject(SeoService);
  private store = inject(Store<AppState>);

  forumMeta = signal<ForumMetaData | null>(null);
  discussions = signal<DiscussionModel[]>([]);
  breadcrumbItems = signal<BreadcrumbItem[]>([]);
  onLoadMeta = signal('false');
  onLoadDiscussions = signal('false');

  user$: Observable<User | null | undefined>;

  forumId: number;
  page: number;

  constructor() {
    this.user$ = this.store.select(selectUserModel);

    const param = this.activatedRoute.snapshot.paramMap.get('forum') ?? '';
    const pageQueryParam = this.activatedRoute.snapshot.queryParams['page'];

    this.forumId = parseInt(param.split('-')[0], 10);
    this.page = parseInt(pageQueryParam, 10) || 1;

    this.onLoadMeta.set('true');
    this.onLoadDiscussions.set('true');

    this.forumService.getForumMeta(this.forumId).subscribe({
      next: (data) => {
        this.forumMeta.set(data);
        this.breadcrumbItems.set([
          {
            link: `/${this.activatedRoute.snapshot.params['category']}`,
            title: <string>this.forumMeta()?.category.name,
          },
          {
            link: `/${this.activatedRoute.snapshot.params['category']}/${this.activatedRoute.snapshot.params['forum']}`,
            title: <string>this.forumMeta()?.name,
          },
        ]);
        this.onLoadMeta.set('success');

        this.seoService.updateTitle(data.name);
        this.seoService.updateDescription(data.metaDescription);

        if (this.page > data.nbPages || this.page < 1) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page: 1 },
            queryParamsHandling: 'merge',
          });

          this.page = 1;
        }

        this.getDisussions();
      },
      error: () => {
        this.onLoadMeta.set('error');
      },
    });

    this.activatedRoute.queryParams.subscribe(() => {
      const pageQueryParam = this.activatedRoute.snapshot.queryParams['page'];

      if ((parseInt(pageQueryParam, 10) || 1) !== this.page) {
        this.page = parseInt(pageQueryParam, 10) || 1;

        this.onLoadDiscussions.set('true');
        this.getDisussions();
      }
    });
  }

  getDisussions(): void {
    this.discussionService.getDiscussions(this.forumId, this.page).subscribe({
      next: (data) => {
        this.discussions.set(data);
        this.onLoadDiscussions.set('success');
      },
      error: () => {
        this.onLoadDiscussions.set('error');
      },
    });
  }
}
