import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../shared/store/app.state';

import { selectUserModel } from '../../../../shared/store/user/user.selectors';

import { User } from '../../../../shared/models/User';
import { DiscussionDetail } from '../../../../shared/models/Discussion';
import { Message as MessageModel } from '../../../../shared/models/Message';

import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { Message as MessageComponent } from '../../../../shared/components/message/message';
import { MessageInput as MessageInputComponent } from '../../../../shared/components/message-input/message-input';

import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Message as MessageService } from '../../../../shared/services/message/message';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';
import { Util as UtilService } from '../../../../shared/services/util/util';
import { App as AppService } from '../../../../shared/services/app/app';

@Component({
  selector: 'app-discussion',
  imports: [
    RouterModule,
    TranslateModule,
    DatePipe,
    MessageComponent,
    PaginationComponent,
    MessageInputComponent,
    AsyncPipe,
  ],
  templateUrl: './discussion.html',
  styleUrl: './discussion.scss',
})
export class Discussion {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private discussionService = inject(DiscussionService);
  private messageService = inject(MessageService);
  private seoService = inject(SeoService);
  private utilService = inject(UtilService);
  private appService = inject(AppService);

  messageInputComponent = viewChild(MessageInputComponent);

  discussion = signal<DiscussionDetail | null>(null);
  messages = signal<MessageModel[]>([]);
  authorLink = computed(() => {
    if (!this.discussion()) {
      return null;
    }

    return `/user/${this.discussion()?.author.id}-${this.utilService.getSlug(<string>this.discussion()?.author?.name)}`;
  });
  onLoadDiscussion = signal('false');
  onLoadMessages = signal('false');
  onReply = signal('false');

  discussionId: number;
  page: number;

  user$: Observable<User | null | undefined>;

  get goToLastMessage(): boolean {
    return (
      this.activatedRoute.snapshot.queryParams['goToLastMessage'] !== undefined
    );
  }

  constructor() {
    this.user$ = this.store.select(selectUserModel);

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

        if (this.goToLastMessage) {
          this.page = data.nbPages;
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page: this.page },
            queryParamsHandling: 'merge',
          });
        } else if (this.page > data.nbPages || this.page < 1) {
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

        if (this.goToLastMessage) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { goToLastMessage: undefined },
            queryParamsHandling: 'merge',
          });

          setTimeout(() => {
            const lastMessage = this.messages()[this.messages().length - 1];
            location.hash = '#' + 'message-' + lastMessage.id;
          });
        }
      },
      error: () => {
        this.onLoadMessages.set('error');
      },
    });
  }

  getUserSlug(id: number, name: string): string {
    return `${id}-${this.utilService.getSlug(name)}`;
  }

  onReplyClick(reply: string): void {
    this.onReply.set('true');

    this.messageService.postMessage(reply, this.discussionId).subscribe({
      next: (data: MessageModel) => {
        if (this.messages().length === 20) {
          this.discussion()!.nbPages++;

          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page: this.discussion()!.nbPages },
            queryParamsHandling: 'merge',
          });
        } else {
          this.messages().push(data);
          this.messageInputComponent()?.form().controls.message.setValue('');
        }

        this.onReply.set('success');
      },
      error: () => {
        this.onReply.set('error');
      },
    });
  }
}
