import { Injectable, inject, DestroyRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectConfigModel } from '../../../shared/store/config/config.selectors';

import { Config } from '../../../shared/models/Config';

@Injectable({
  providedIn: 'root',
})
export class Seo {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private title = inject(Title);
  private meta = inject(Meta);

  config$: Observable<Config | null>;

  forumTitle: string = '';

  constructor() {
    this.config$ = this.store.select(selectConfigModel);

    const configSubscription = this.config$.subscribe(
      (config: Config | null) => {
        if (config) {
          this.forumTitle = config.title;
        }
      },
    );

    this.destroyRef.onDestroy(() => configSubscription.unsubscribe());
  }

  updateTitle(title: string) {
    this.title.setTitle(`${title} - ${this.forumTitle}`);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }
}
