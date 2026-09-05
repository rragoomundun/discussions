import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { UserMessage } from '../../../../shared/models/UserMessage';

import * as urlUtil from '../../../../shared/utils/url/url.util';
import * as textUtil from '../../../../shared/utils/text/text.util';

@Component({
  selector: 'app-message-item',
  imports: [RouterModule, TranslateModule, DatePipe],
  templateUrl: './message-item.html',
  styleUrl: './message-item.scss',
})
export class MessageItem {
  message = input.required<UserMessage>();

  categorySlug = computed(() => {
    return `${this.message().category.id}-${urlUtil.getSlug(this.message().category.name)}`;
  });

  forumSlug = computed(() => {
    return `${this.message().forum.id}-${urlUtil.getSlug(this.message().forum.name)}`;
  });

  discussionSlug = computed(() => {
    return `${this.message().discussion.id}-${urlUtil.getSlug(this.message().discussion.title)}`;
  });

  html = computed(() => {
    return textUtil.markdownToHTML(this.message().message.message);
  });
}
