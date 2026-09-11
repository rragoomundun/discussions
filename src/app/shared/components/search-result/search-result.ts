import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { SearchResult as SearchResultModel } from '../../models/SearchResult';

import * as urlUtil from '../../utils/url/url.util';
import * as textUtil from '../../utils/text/text.util';

@Component({
  selector: 'app-search-result',
  imports: [RouterModule, TranslateModule],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss',
})
export class SearchResult {
  result = input.required<SearchResultModel>();

  userSlug = computed(() => {
    return `${this.result().user.id}-${urlUtil.getSlug(this.result().user.name)}`;
  });

  categorySlug = computed(() => {
    return `${this.result().category.id}-${urlUtil.getSlug(this.result().category.name)}`;
  });

  forumSlug = computed(() => {
    return `${this.result().forum.id}-${urlUtil.getSlug(this.result().forum.name)}`;
  });

  discussionSlug = computed(() => {
    return `${this.result().discussion.id}-${urlUtil.getSlug(this.result().discussion.title)}`;
  });

  html = computed(() => {
    return textUtil.markdownToHTML(this.result().message.message);
  });
}
