import { Component, computed, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DiscussionDetail } from '../../../../shared/models/Discussion';
import { Message as MessageModel } from '../../../../shared/models/Message';

import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { Message as MessageComponent } from '../../../../shared/component/message/message';

import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Message as MessageService } from '../../../../shared/services/message/message';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';
import { Util as UtilService } from '../../../../shared/services/util/util';

@Component({
  selector: 'app-discussion',
  imports: [
    RouterModule,
    TranslateModule,
    DatePipe,
    MessageComponent,
    PaginationComponent,
  ],
  templateUrl: './discussion.html',
  styleUrl: './discussion.scss',
})
export class Discussion {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private discussionService = inject(DiscussionService);
  private messageService = inject(MessageService);
  private seoService = inject(SeoService);
  private utilService = inject(UtilService);

  discussion = signal<DiscussionDetail | null>(null);
  messages = signal<MessageModel[]>([]);
  authorLink = computed(() => {
    if (!this.discussion()) {
      return null;
    }

    return `/user/${this.discussion()?.author.id}${this.utilService.getSlug(<string>this.discussion()?.author?.name)}`;
  });
  onLoadDiscussion = signal('false');
  onLoadMessages = signal('false');

  discussionId: number;
  page: number;

  constructor() {
    const param = this.activatedRoute.snapshot.paramMap.get('discussion') ?? '';
    const pageQueryParam = this.activatedRoute.snapshot.queryParams['page'];

    this.discussionId = parseInt(param.split('-')[0], 10);
    this.page = parseInt(pageQueryParam, 10) || 1;

    this.onLoadDiscussion.set('true');
    this.onLoadMessages.set('true');

    this.discussionService.getDiscussion(this.discussionId).subscribe({
      next: (data) => {
        this.discussion.set(data);
        this.onLoadDiscussion.set('success');

        this.seoService.updateTitle(data.title);

        if (this.page > data.nbPages || this.page < 1) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page: 1 },
            queryParamsHandling: 'merge',
          });

          this.page = 1;
        }

        this.getMessages();
      },
      error: () => {
        this.onLoadDiscussion.set('error');
      },
    });

    this.activatedRoute.queryParams.subscribe(() => {
      const pageQueryParam = this.activatedRoute.snapshot.queryParams['page'];

      if ((parseInt(pageQueryParam, 10) || 1) !== this.page) {
        this.page = parseInt(pageQueryParam, 10) || 1;

        this.onLoadMessages.set('true');
        this.getMessages();
      }
    });
  }

  getMessages(): void {
    this.messageService.getMessages(this.discussionId, this.page).subscribe({
      next: (data) => {
        this.messages.set(data);
        this.onLoadMessages.set('success');
      },
      error: () => {
        this.onLoadMessages.set('error');
      },
    });
  }

  getUserSlug(id: number, name: string): string {
    return `${id}-${this.utilService.getSlug(name)}`;
  }
}
