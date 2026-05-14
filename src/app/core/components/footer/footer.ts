import { Component, inject, DestroyRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from '../../../shared/store/app.state';
import {
  selectBottomLinks,
  selectConfigModel,
} from '../../../shared/store/config/config.selectors';

import { Config } from '../../../shared/models/Config';
import { BottomLink } from '../../../shared/models/BottomLink';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, AsyncPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  config$: Observable<Config | null>;
  bottomLinks$: Observable<BottomLink[]>;

  createdYear: number | null;
  currentYear: number;

  constructor() {
    this.config$ = this.store.select(selectConfigModel);
    this.bottomLinks$ = this.store.select(selectBottomLinks);
    this.createdYear = null;
    this.currentYear = new Date().getFullYear();

    const configSubscription = this.config$.subscribe(
      (value: Config | null) => {
        this.createdYear = new Date(<Date>value?.createdAt).getFullYear();
      },
    );

    this.destroyRef.onDestroy(() => configSubscription.unsubscribe());
  }
}
