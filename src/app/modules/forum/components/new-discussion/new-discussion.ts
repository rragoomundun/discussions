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

import { Input as InputComponent } from '../../../../shared/components/input/input';
import { MessageInput as MessageInputComponent } from '../../../../shared/components/message-input/message-input';

import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Message as MessageService } from '../../../../shared/services/message/message';
import { Util as UtilService } from '../../../../shared/services/util/util';

@Component({
  selector: 'app-new-discussion',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    InputComponent,
    MessageInputComponent,
  ],
  templateUrl: './new-discussion.html',
  styleUrl: './new-discussion.scss',
})
export class NewDiscussion {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private discussionService = inject(DiscussionService);
  private messageService = inject(MessageService);
  private utilService = inject(UtilService);

  form = signal(
    new FormGroup({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  );

  newDiscussion = signal<NewDiscussionResult | null>(null);
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
            const discussionSlug = `${discussion.id}-${this.utilService.getSlug(discussion.title)}`;

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
