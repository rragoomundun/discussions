import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, tap } from 'rxjs';

import * as AuthActions from './auth.actions';

import { Auth } from '../../services/auth/auth';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(Auth);
  private cookieService = inject(CookieService);

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() =>
          this.authService.logout().pipe(
            tap(() => {
              this.cookieService.delete('token');
              window.location.href = window.location.origin;
            }),
          ),
        ),
      ),
    {
      dispatch: false,
    },
  );
}
