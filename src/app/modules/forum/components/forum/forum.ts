import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { ForumMetaData } from '../../../../shared/models/ForumMetaData';
import { Discussion as DiscussionModel } from '../../../../shared/models/Discussion';

import { DiscussionLink as DiscussionLinkComponent } from '../../discussion-link/discussion-link';
import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';

import { Forum as ForumService } from '../../../../shared/services/forum/forum';
import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';

@Component({
  selector: 'app-forum',
  imports: [TranslateModule, DiscussionLinkComponent, PaginationComponent],
  templateUrl: './forum.html',
  styleUrl: './forum.scss',
})
export class Forum {
  private route = inject(ActivatedRoute);
  private forumService = inject(ForumService);
  private discussionService = inject(DiscussionService);
  private seoService = inject(SeoService);

  forumMeta = signal<ForumMetaData | null>(null);
  discussions = signal<DiscussionModel[]>([]);
  onLoadMeta = signal('false');
  onLoadDiscussions = signal('false');

  forumId: number;
  page: number;

  constructor() {
    const param = this.route.snapshot.paramMap.get('forum') ?? '';
    const pageQueryParam = this.route.snapshot.queryParams['page'];

    this.forumId = parseInt(param.split('-')[0], 10);
    this.page = parseInt(pageQueryParam, 10) || 1;

    this.onLoadMeta.set('true');
    this.onLoadDiscussions.set('true');

    this.forumService.getForumMeta(this.forumId).subscribe({
      next: (data) => {
        this.forumMeta.set(data);
        this.onLoadMeta.set('success');

        this.seoService.updateTitle(data.name);
        this.seoService.updateDescription(data.metaDescription);

        this.getDisussions();
      },
      error: () => {
        this.onLoadMeta.set('error');
      },
    });

    this.route.queryParams.subscribe(() => {
      const pageQueryParam = this.route.snapshot.queryParams['page'];

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
