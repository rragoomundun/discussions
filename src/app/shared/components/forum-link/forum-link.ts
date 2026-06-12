import {
  Component,
  input,
  inject,
  signal,
  computed,
  AfterViewInit,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Forum } from '../../models/Forum';

import * as urlUtil from '../../utils/url/url.util';

@Component({
  selector: 'app-forum-link',
  imports: [TranslateModule, RouterModule, DatePipe],
  templateUrl: './forum-link.html',
  styleUrl: './forum-link.scss',
})
export class ForumLink implements AfterViewInit {
  activatedRoute = inject(ActivatedRoute);

  category = input<{ id: number | undefined; name: string }>();
  forum = input<Forum>();

  categorySlug = signal('');
  isCategorySlugSet = signal(false);
  forumSlug = computed(() => {
    if (!this.isCategorySlugSet()) {
      return null;
    }

    return `${this.forum()?.id}-${urlUtil.getSlug(this.forum()!.name)}`;
  });
  lastMessageSlug = computed(() => {
    if (!this.isCategorySlugSet()) {
      return null;
    }

    return `${this.forum()?.lastMessage?.discussion?.id}-${urlUtil.getSlug(this.forum()!.lastMessage!.discussion.name)}`;
  });

  ngAfterViewInit(): void {
    if (this.activatedRoute.snapshot.params['category'] === undefined) {
      this.categorySlug.set(
        this.category()?.id + '-' + urlUtil.getSlug(this.category()!.name),
      );
    } else {
      this.categorySlug.set('./');
    }

    this.isCategorySlugSet.set(true);
  }
}
