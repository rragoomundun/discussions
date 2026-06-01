import { Component, input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Forum } from '../../models/Forum';

import { Util as UtilService } from '../../services/util/util';

@Component({
  selector: 'app-forum-link',
  imports: [TranslateModule, RouterModule, DatePipe],
  templateUrl: './forum-link.html',
  styleUrl: './forum-link.scss',
})
export class ForumLink {
  utilService = inject(UtilService);

  category = input<{ id: number | undefined; name: string }>();
  forum = input<Forum>();
}
