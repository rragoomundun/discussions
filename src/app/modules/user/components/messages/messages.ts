import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { UserMessage } from '../../../../shared/models/UserMessage';

import { MessageItem as MessageItemComponent } from '../message-item/message-item';
import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';

import { User as UserService } from '../../../../shared/services/user/user';

@Component({
  selector: 'app-messages',
  imports: [TranslateModule, MessageItemComponent, PaginationComponent],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class Messages {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  nbPages = signal(1);
  messages = signal<UserMessage[]>([]);
  onLoadMeta = signal('false');
  onLoadMessages = signal('false');

  private userId: number;
  private page: number | null;

  constructor() {
    const param = this.route.parent?.snapshot.paramMap.get('id') ?? '';
    this.userId = parseInt(param.split('-')[0], 10);

    const pageQueryParam = this.route.snapshot.queryParams['page'];

    this.page = pageQueryParam ? parseInt(pageQueryParam, 10) : null;

    this.onLoadMeta.set('true');
    this.onLoadMessages.set('true');

    this.userService.getUserMessagesMeta(this.userId).subscribe({
      next: (data) => {
        this.nbPages.set(data.nbPages);
        this.onLoadMeta.set('success');
      },
      error: () => {
        this.onLoadMeta.set('error');
      },
    });

    this.getMessages();

    this.route.queryParams.subscribe(() => {
      const pageQueryParam = this.route.snapshot.queryParams['page'];
      const newPage = pageQueryParam ? parseInt(pageQueryParam, 10) : null;

      if (newPage !== this.page) {
        this.page = newPage;

        this.onLoadMessages.set('true');
        this.getMessages();
      }
    });
  }

  getMessages(): void {
    this.userService.getUserMessages(this.userId, this.page).subscribe({
      next: (data) => {
        this.messages.set(data);
        this.onLoadMessages.set('success');
      },
      error: () => {
        this.onLoadMessages.set('error');
      },
    });
  }
}
