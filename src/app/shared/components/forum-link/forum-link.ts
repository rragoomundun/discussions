import { Component, input, inject, signal, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Forum } from '../../models/Forum';

import { Util as UtilService } from '../../services/util/util';

@Component({
  selector: 'app-forum-link',
  imports: [TranslateModule, RouterModule, DatePipe],
  templateUrl: './forum-link.html',
  styleUrl: './forum-link.scss',
})
export class ForumLink implements AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  utilService = inject(UtilService);

  category = input<{ id: number | undefined; name: string }>();
  forum = input<Forum>();

  categorySlug = signal('');
  isCategorySlugSet = signal(false);

  ngAfterViewInit(): void {
    if (this.activatedRoute.snapshot.params['category'] === undefined) {
      this.categorySlug.set(
        this.category()?.id +
          '-' +
          this.utilService.getSlug(this.category()!.name),
      );
      console.log('in first if');
    } else {
      console.log('in else');
      this.categorySlug.set('./');
    }

    this.isCategorySlugSet.set(true);
  }
}
