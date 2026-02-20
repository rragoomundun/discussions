import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { AppState } from '../../../shared/store/app.state';

import { selectUserModel } from '../../../shared/store/user/user.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectUserModel).pipe(
    filter((user) => user !== undefined),
    map((user) => {
      if (user && user.role === 'admin') {
        return true;
      }

      return router.createUrlTree(['/']);
    }),
  );
};
