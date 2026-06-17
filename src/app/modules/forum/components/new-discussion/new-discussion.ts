import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NewDiscussionResult } from '../../../../shared/models/Discussion';
import { BreadcrumbItem } from '../../../../shared/models/BreadcrumbItem';

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { MessageInput as MessageInputComponent } from '../../../../shared/components/message-input/message-input';
import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Message as MessageService } from '../../../../shared/services/message/message';
import { Forum as ForumService } from '../../../../shared/services/forum/forum';
import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

import * as urlUtil from '../../../../shared/utils/url/url.util';

@Component({
  selector: 'app-new-discussion',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    InputComponent,
    MessageInputComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './new-discussion.html',
  styleUrl: './new-discussion.scss',
})
export class NewDiscussion {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private forumService = inject(ForumService);
  private discussionService = inject(DiscussionService);
  private messageService = inject(MessageService);
  private translationService = inject(TranslationService);

  form = signal(
    new FormGroup({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  );
  breadcrumbItems = signal<BreadcrumbItem[]>([]);
  newDiscussion = signal<NewDiscussionResult | null>(null);
  onLoad = signal('false');
  onPost = signal('false');

  forumId: number;
  categorySlug: string;
  forumSlug: string;

  constructor() {
    const forumParam = this.activatedRoute.snapshot.paramMap.get('forum') ?? '';
    const categoryParam =
      this.activatedRoute.snapshot.paramMap.get('category') ?? '';

    this.forumId = parseInt(forumParam.split('-')[0], 10);
    this.categorySlug = categoryParam;
    this.forumSlug = forumParam;

    this.onLoad.set('true');

    this.forumService.getForumMeta(this.forumId).subscribe({
      next: (data) => {
        this.breadcrumbItems.set([
          {
            link: `/${this.categorySlug}`,
            title: data.category.name,
          },
          {
            link: `/${this.categorySlug}/${this.forumSlug}`,
            title: data.name,
          },
          {
            link: '#',
            title: this.translationService.instant('GENERAL.NEW_DISCUSSION'),
          },
        ]);

        this.onLoad.set('success');
      },
      error: () => {
        this.onLoad.set('error');
      },
    });
  }

  onSubmit(message: string): void {
    if (this.form().invalid || this.onPost() === 'true') {
      return;
    }

    const title = this.form().controls.title.value;

    this.onPost.set('true');

    this.discussionService.createDiscussion(title, this.forumId).subscribe({
      next: (discussion) => {
        this.newDiscussion.set(discussion);

        this.messageService.postMessage(message, discussion.id).subscribe({
          next: () => {
            const discussionSlug = `${discussion.id}-${urlUtil.getSlug(discussion.title)}`;

            this.router.navigate([
              '/',
              this.categorySlug,
              this.forumSlug,
              discussionSlug,
            ]);
          },
          error: () => {
            this.onPost.set('error');
          },
        });
      },
      error: () => {
        this.onPost.set('error');
      },
    });
  }
}
