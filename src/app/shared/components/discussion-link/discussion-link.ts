import { Component, input, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Discussion as DiscussionModel } from '../../models/Discussion';

import * as urlUtil from '../../utils/url/url.util';

@Component({
  selector: 'app-discussion-link',
  imports: [RouterModule, TranslateModule, DatePipe],
  templateUrl: './discussion-link.html',
  styleUrl: './discussion-link.scss',
})
export class DiscussionLink {
  discussion = input<DiscussionModel>();
  discussionSlug = computed(() => {
    return `/${this.discussion()!.category!.id}-${urlUtil.getSlug(this.discussion()!.category!.name)}/${this.discussion()!.forum!.id}-${urlUtil.getSlug(this.discussion()!.forum!.name)}/${this.discussion()!.id}-${urlUtil.getSlug(this.discussion()!.title)}`;
  });
  userSlug = computed(() => {
    return `${this.discussion()!.user.id}-${urlUtil.getSlug(this.discussion()!.user.name)}`;
  });
  lastUserSlug = computed(() => {
    return `${this.discussion()!.lastMessage?.user.id}-${urlUtil.getSlug(this.discussion()!.lastMessage?.user.name ?? '')}`;
  });
}
