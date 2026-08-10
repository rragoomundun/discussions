import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectUserModel } from '../../store/user/user.selectors';

import { Message as MessageModel } from '../../models/Message';
import { User } from '../../models/User';

import { Translation as TranslationService } from '../../services/translation/translation';

import * as messageUtil from '../../utils/message/message.util';
import * as textUtil from '../../utils/text/text.util';
import * as urlUtil from '../../utils/url/url.util';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-message',
  imports: [TranslateModule, RouterModule, DatePipe],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  translationService = inject(TranslationService);

  message = input<MessageModel>();
  index = input<Number>(0);
  html = computed(() => {
    return textUtil.markdownToHTML(<string>this.message()?.message);
  });
  authorImage = computed(() => {
    if (!this.message()?.author.image) {
      return null;
    }

    return this.message()?.author.image;
  });
  authorLink = computed(() => {
    return `/user/${this.message()?.author.id}-${urlUtil.getSlug(this.message()!.author!.name)}`;
  });
  editorLink = computed(() => {
    if (!this.message()?.editor) {
      return null;
    }

    return `/user/${this.message()?.editor?.id}-${urlUtil.getSlug(<string>this.message()?.editor?.name)}`;
  });

  user$: Observable<User | null | undefined>;
  user: User | null | undefined;

  page = signal(0);
  discussionId = signal(0);

  get canEdit(): boolean {
    return messageUtil.canEdit(this.message(), this.user);
  }

  constructor() {
    this.user$ = this.store.select(selectUserModel);
    this.page.set(Number(this.activatedRoute.snapshot.queryParams['page']));
    this.discussionId.set(
      Number(this.activatedRoute.snapshot.params['discussion'].split('-')[0]),
    );

    const subscription = this.user$.subscribe(
      (user: User | null | undefined) => {
        this.user = user;
      },
    );

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
