import { Component, input, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Discussion as DiscussionModel } from '../../../../shared/models/Discussion';

import { Util as UtilService } from '../../../../shared/services/util/util';

@Component({
  selector: 'app-discussion-link',
  imports: [RouterModule, TranslateModule, DatePipe],
  templateUrl: './discussion-link.html',
  styleUrl: './discussion-link.scss',
})
export class DiscussionLink {
  private utilService = inject(UtilService);

  discussion = input<DiscussionModel>();
  discussionSlug = computed(() => {
    return `${this.discussion()!.id}-${this.utilService.getSlug(this.discussion()!.title)}`;
  });
  userSlug = computed(() => {
    return `${this.discussion()!.user.id}-${this.utilService.getSlug(this.discussion()!.user.name)}`;
  });
  lastUserSlug = computed(() => {
    return `${this.discussion()!.lastMessage?.user.id}-${this.utilService.getSlug(this.discussion()!.lastMessage?.user.name ?? '')}`;
  });
}
