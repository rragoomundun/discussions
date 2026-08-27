import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { AppState } from '../../../shared/store/app.state';

import { selectConfigConfigExists } from '../../../shared/store/config/config.selectors';

export const setupGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectConfigConfigExists).pipe(
    filter((exists) => exists !== null),
    map((exists) => {
      if (!exists?.config) {
        return true;
      }

      return router.createUrlTree(['/']);
    }),
  );
};
