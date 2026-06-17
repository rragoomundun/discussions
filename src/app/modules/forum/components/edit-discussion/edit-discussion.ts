import {
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/store/app.state';
import { selectUserModel } from '../../../../shared/store/user/user.selectors';

import { AsyncPipe } from '@angular/common';

import { User as UserModel } from '../../../../shared/models/User';
import { DiscussionDetail as DiscussionDetailModel } from '../../../../shared/models/Discussion';
import { Message as MessageModel } from '../../../../shared/models/Message';
import { BreadcrumbItem as BreadcrumbItemModel } from '../../../../shared/models/BreadcrumbItem';

import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Input as InputComponent } from '../../../../shared/components/input/input';
import { TextArea as TextAreaComponent } from '../../../../shared/components/text-area/text-area';
import { MessagePreview as MessagePreviewComponent } from '../../../../shared/components/message-preview/message-preview';

import { Discussion as DiscussionService } from '../../../../shared/services/discussion/discussion';
import { Message as MessageService } from '../../../../shared/services/message/message';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';
import { Translation as TranslationService } from '../../../../shared/services/translation/translation';

import * as urlUtil from '../../../../shared/utils/url/url.util';

@Component({
  selector: 'app-edit-discussion',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    BreadcrumbComponent,
    InputComponent,
    TextAreaComponent,
    MessagePreviewComponent,
  ],
  templateUrl: './edit-discussion.html',
  styleUrl: './edit-discussion.scss',
})
export class EditDiscussion {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private discussionService = inject(DiscussionService);
  private messageService = inject(MessageService);
  private seoService = inject(SeoService);
  private translationService = inject(TranslationService);

  previewComponent = viewChild<MessagePreviewComponent>(
    MessagePreviewComponent,
  );

  user$: Observable<UserModel | null | undefined>;

  discussion = signal<DiscussionDetailModel | null>(null);
  message = signal<MessageModel | null>(null);
  breadcrumbItems = signal<BreadcrumbItemModel[]>([]);
  isDisabled = signal(false);

  formGroup = signal(
    new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      reason: new FormControl(''),
    }),
  );

  onLoadDiscussion = signal('false');
  onLoadMessage = signal('false');
  onEdit = signal('false');

  discussionUrl = '';

  constructor() {
    this.user$ = this.store.select(selectUserModel);

    const discussionId = this.activatedRoute.snapshot.params['discussionId'];

    this.onLoadDiscussion.set('true');
    this.onLoadMessage.set('true');

    this.discussionService.getDiscussion(discussionId).subscribe({
      next: (data: DiscussionDetailModel) => {
        this.discussion.set(data);
        this.seoService.updateTitle(
          `${data.title} - ${this.translationService.instant('GENERAL.EDITION')}`,
        );
        this.onLoadDiscussion.set('success');

        const categoryUrl = `/${this.discussion()?.category.id}-${urlUtil.getSlug(<string>this.discussion()?.category.name)}`;
        const forumUrl = `${categoryUrl}/${this.discussion()?.forum.id}-${urlUtil.getSlug(<string>this.discussion()?.forum.name)}`;
        this.discussionUrl = `${forumUrl}/${this.discussion()?.id}-${urlUtil.getSlug(<string>this.discussion()?.title)}`;

        this.breadcrumbItems.set([
          {
            link: categoryUrl,
            title: <string>this.discussion()?.category.name,
          },
          {
            link: forumUrl,
            title: <string>this.discussion()?.forum.name,
          },
          {
            link: this.discussionUrl,
            title: <string>this.discussion()?.title,
          },
          {
            link: '/',
            title: this.translationService.instant(
              'EDIT_DISCUSSION_COMPONENT.EDIT',
            ),
          },
        ]);

        this.formGroup()
          .get('title')
          ?.setValue(<string>this.discussion()?.title);

        this.setDisabled();
      },
      error: () => this.onLoadDiscussion.set('error'),
    });

    this.messageService.getFirstMessage(discussionId).subscribe({
      next: (data: MessageModel) => {
        this.message.set(data);
        this.onLoadMessage.set('success');

        this.formGroup()
          .get('message')
          ?.setValue(<string>this.message()?.message);
        this.formGroup()
          .get('reason')
          ?.setValue(<string>this.message()?.editionComment);
      },
      error: () => this.onLoadMessage.set('error'),
    });
  }

  // Disable the fields if the user doesn't have edit right
  setDisabled(): void {
    const subscription = this.user$.subscribe({
      next: (user: UserModel | null | undefined) => {
        if (
          (user?.role === 'regular' &&
            this.discussion()?.author.id !== user!.id) ||
          (this.discussion()?.author.role === 'moderator' &&
            user?.role === 'moderator' &&
            this.discussion()?.author.id !== user.id) ||
          (this.discussion()?.author.role === 'admin' && user?.role !== 'admin')
        ) {
          this.formGroup().get('title')?.disable({ onlySelf: true });
          this.formGroup().get('message')?.disable({ onlySelf: true });
          this.formGroup().get('reason')?.disable({ onlySelf: true });

          this.isDisabled.set(true);
        }
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onPreviewClick(): void {
    this.previewComponent()?.preview(
      <string>this.formGroup().get('message')!.value,
    );
  }

  onEditClick(): void {
    const discussionId = Number(
      this.activatedRoute.snapshot.params['discussionId'],
    );

    this.onEdit.set('true');

    this.discussionService
      .updateDiscussion(
        <string>this.formGroup().get('title')?.value,
        discussionId,
      )
      .subscribe({
        next: () => {
          this.messageService
            .updateMessage(
              <string>this.formGroup().get('message')?.value,
              <string>this.formGroup().get('reason')?.value,
              this.message()!.id,
            )
            .subscribe({
              next: () => this.router.navigate([this.discussionUrl]),
            });
        },
      });
  }
}
