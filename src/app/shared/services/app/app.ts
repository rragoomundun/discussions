import { inject, Injectable, DestroyRef } from '@angular/core';

import { Router } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';

import * as ConfigActions from '../../store/config/config.actions';
import * as UserActions from '../../store/user/user.actions';
import { selectConfigConfigExists } from '../../store/config/config.selectors';

@Injectable({
  providedIn: 'root',
})
export class App {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(ConfigActions.getExists());

      const existsSubscription = this.store
        .select(selectConfigConfigExists)
        .subscribe((value) => {
          this.store.dispatch(ConfigActions.getConfig());

          if (value !== null) {
            if (!value?.config) {
              this.router.navigate(['/setup']);
            } else if (
              !value?.admin &&
              this.router.url.includes('/register/confirm') === false
            ) {
              this.router.navigate(['/auth/register']);
            } else if (this.router.url === '/setup') {
              this.router.navigate(['/']);
              this.store.dispatch(UserActions.getUser());
            } else {
              this.store.dispatch(UserActions.getUser());
            }
          }

          resolve();
        });

      this.destroyRef.onDestroy(() => existsSubscription);
    });
  }

  platform(): 'browser' | 'server' {
    return isPlatformBrowser(this.platformId) ? 'browser' : 'server';
  }
}
