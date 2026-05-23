import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { AppState } from '../../../shared/store/app.state';

import { selectUserModel } from '../../../shared/store/user/user.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectUserModel).pipe(
    filter((user) => user !== undefined),
    map((user) => {
      if (user) {
        return true;
      }

      return router.createUrlTree(['/']);
    }),
  );
};
