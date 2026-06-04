import { Component, inject, DestroyRef, signal } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectConfigModel } from '../../../../shared/store/config/config.selectors';

import { Category } from '../../../../shared/models/Category';
import { Config } from '../../../../shared/models/Config';

import { ForumLink as ForumLinkComponent } from '../../../../shared/components/forum-link/forum-link';
import { Breadcrumb as BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';

import { Forum as ForumService } from '../../../../shared/services/forum/forum';
import { Util as UtilService } from '../../../../shared/services/util/util';
import { Seo as SeoService } from '../../../../shared/services/seo/seo';

@Component({
  selector: 'app-forum-home',
  imports: [
    TranslateModule,
    RouterModule,
    ForumLinkComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './forum-home.html',
  styleUrl: './forum-home.scss',
  standalone: true,
})
export class ForumHome {
  private forumService = inject(ForumService);
  private seoService = inject(SeoService);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  utilService = inject(UtilService);

  config$: Observable<Config | null>;

  categories = signal<Category[] | null>(null);
  onLoad = signal('false');

  constructor() {
    this.config$ = this.store.select(selectConfigModel);

    this.onLoad.set('true');

    this.forumService.getHome().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.onLoad.set('success');
      },
      error: (error) => {
        this.categories.set([]);
        this.onLoad.set('error');
      },
    });

    const configSubscription = this.config$.subscribe(
      (config: Config | null) => {
        if (config) {
          this.seoService.updateDescription(config.metaDescription);
        }
      },
    );

    this.destroyRef.onDestroy(() => configSubscription.unsubscribe());
  }
}
