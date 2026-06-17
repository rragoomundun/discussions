import {
  Component,
  inject,
  signal,
  DestroyRef,
  viewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/store/app.state';
import { selectUserModel } from '../../../../shared/store/user/user.selectors';

import { User as UserModel } from '../../../../shared/models/User';
import { Message as MessageModel } from '../../../../shared/models/Message';
import { DiscussionDetail as DiscussionDetailModel } from '../../../../shared/models/Discussion';
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
  selector: 'app-edit-message',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    BreadcrumbComponent,
    InputComponent,
    TextAreaComponent,
    MessagePreviewComponent,
  ],
  templateUrl: './edit-message.html',
  styleUrl: './edit-message.scss',
})
export class EditMessage {
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

  message = signal<MessageModel | null>(null);
  breadcrumbItems = signal<BreadcrumbItemModel[]>([]);
  isDisabled = signal(false);

  formGroup = signal(
    new FormGroup({
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

    const discussionId = Number(
      this.activatedRoute.snapshot.queryParams['discussionId'],
    );
    const messageId = Number(this.activatedRoute.snapshot.params['messageId']);

    this.onLoadDiscussion.set('true');
    this.onLoadMessage.set('true');

    this.discussionService.getDiscussion(discussionId).subscribe({
      next: (discussion: DiscussionDetailModel) => {
        this.seoService.updateTitle(
          `${discussion.title} - ${this.translationService.instant('EDIT_MESSAGE_COMPONENT.TITLE')}`,
        );
        this.onLoadDiscussion.set('success');

        const categoryUrl = `/${discussion?.category.id}-${urlUtil.getSlug(<string>discussion?.category.name)}`;
        const forumUrl = `${categoryUrl}/${discussion?.forum.id}-${urlUtil.getSlug(<string>discussion?.forum.name)}`;
        this.discussionUrl = `${forumUrl}/${discussion?.id}-${urlUtil.getSlug(<string>discussion?.title)}`;

        this.breadcrumbItems.set([
          {
            link: categoryUrl,
            title: <string>discussion?.category.name,
          },
          {
            link: forumUrl,
            title: <string>discussion?.forum.name,
          },
          {
            link: this.discussionUrl,
            title: <string>discussion?.title,
          },
          {
            link: '/',
            title: this.translationService.instant(
              'EDIT_MESSAGE_COMPONENT.EDIT',
            ),
          },
        ]);
      },
      error: () => this.onLoadDiscussion.set('error'),
    });

    this.messageService.getMessage(messageId).subscribe({
      next: (data: MessageModel) => {
        this.message.set(data);
        this.onLoadMessage.set('success');

        this.formGroup()
          .get('message')
          ?.setValue(<string>this.message()?.message);

        this.formGroup()
          .get('reason')
          ?.setValue(<string>this.message()?.editionComment);

        this.setDisabled();
        this.clearReason();
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
            this.message()?.author.id !== user!.id) ||
          (this.message()?.author.role === 'moderator' &&
            user?.role === 'moderator' &&
            this.message()?.author.id !== user.id) ||
          (this.message()?.author.role === 'admin' && user?.role !== 'admin')
        ) {
          this.formGroup().get('message')?.disable({ onlySelf: true });

          this.isDisabled.set(true);
        }
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  // Clear reason field if we are dealing with a regular user
  clearReason(): void {
    const subscription = this.user$.subscribe({
      next: (user: UserModel | null | undefined) => {
        if (user?.role === 'regular') {
          this.formGroup().get('reason')?.setValue(null);
        }
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    ('');
  }

  onPreviewClick(): void {
    this.previewComponent()?.preview(
      <string>this.formGroup().get('message')!.value,
    );
  }

  onEditClick(): void {
    this.onEdit.set('true');

    this.messageService
      .updateMessage(
        <string>this.formGroup().get('message')?.value,
        <string>this.formGroup().get('reason')?.value,
        this.message()!.id,
      )
      .subscribe({
        next: () => {
          const page = Number(
            this.activatedRoute.snapshot.queryParams['discussionPage'],
          );
          this.router.navigate([this.discussionUrl], {
            queryParams: { page },
            fragment: `message-${this.message()!.id}`,
          });
        },
      });
  }
}
