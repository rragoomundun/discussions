import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { UserWarning } from '../../../../shared/models/UserWarning';

import * as urlUtil from '../../../../shared/utils/url/url.util';

@Component({
  selector: 'app-warning-item',
  imports: [TranslateModule, RouterModule, DatePipe],
  templateUrl: './warning-item.html',
  styleUrl: './warning-item.scss',
})
export class WarningItem {
  warning = input.required<UserWarning>();

  get moderatorLink(): string {
    return `/user/${this.warning().moderator.id}-${urlUtil.getSlug(
      this.warning().moderator.name,
    )}`;
  }
}
