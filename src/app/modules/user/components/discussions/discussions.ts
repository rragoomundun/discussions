import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { Discussion as DiscussionModel } from '../../../../shared/models/Discussion';

import { DiscussionLink as DiscussionLinkComponent } from '../../../../shared/components/discussion-link/discussion-link';
import { Pagination as PaginationComponent } from '../../../../shared/components/pagination/pagination';

import { User as UserService } from '../../../../shared/services/user/user';

@Component({
  selector: 'app-discussions',
  imports: [TranslateModule, DiscussionLinkComponent, PaginationComponent],
  templateUrl: './discussions.html',
  styleUrl: './discussions.scss',
})
export class Discussions {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  nbPages = signal(1);
  discussions = signal<DiscussionModel[]>([]);
  onLoadMeta = signal('false');
  onLoadDiscussions = signal('false');

  private userId: number;
  private page: number | null;

  constructor() {
    const param = this.route.parent?.snapshot.paramMap.get('id') ?? '';
    this.userId = parseInt(param.split('-')[0], 10);

    const pageQueryParam = this.route.snapshot.queryParams['page'];

    this.page = pageQueryParam ? parseInt(pageQueryParam, 10) : null;

    this.onLoadMeta.set('true');
    this.onLoadDiscussions.set('true');

    this.userService.getUserDiscussionsMeta(this.userId).subscribe({
      next: (data) => {
        this.nbPages.set(data.nbPages);
        this.onLoadMeta.set('success');
      },
      error: () => {
        this.onLoadMeta.set('error');
      },
    });

    this.getDiscussions();

    this.route.queryParams.subscribe(() => {
      const pageQueryParam = this.route.snapshot.queryParams['page'];
      const newPage = pageQueryParam ? parseInt(pageQueryParam, 10) : null;

      if (newPage !== this.page) {
        this.page = newPage;

        this.onLoadDiscussions.set('true');
        this.getDiscussions();
      }
    });
  }

  getDiscussions(): void {
    this.userService.getUserDiscussions(this.userId, this.page).subscribe({
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
