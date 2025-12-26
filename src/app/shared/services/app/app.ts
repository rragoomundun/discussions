import { inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';

import * as ConfigActions from '../../store/config/config.actions';
import { selectConfigExists } from '../../store/config/config.selectors';

@Injectable({
  providedIn: 'root',
})
export class App {
  private store = inject(Store<AppState>);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(ConfigActions.getExists());

      this.store.select(selectConfigExists).subscribe((value) => {
        if (value === false) {
          this.router.navigate(['/setup']).then(() => resolve());
        } else {
          // Get config
          // Get user
          // If can get user, redirects to /
          // If cannot get user, redirects to /login

          resolve();
        }
      });
    });
  }

  platform(): 'browser' | 'server' {
    return isPlatformBrowser(this.platformId) ? 'browser' : 'server';
  }
}
