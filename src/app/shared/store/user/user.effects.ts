import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of } from 'rxjs';

import * as UserActions from './user.actions';

import { User as UserService } from '../../services/user/user';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((user) => UserActions.getUserSuccess({ user })),
          catchError(() => of(UserActions.getUserFailure())),
        ),
      ),
    ),
  );

  updateEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateEmail),
      exhaustMap(({ email }) =>
        this.userService.updateEmail(email).pipe(
          map(() => UserActions.updateEmailSuccess({ email })),
          catchError(() => of(UserActions.updateEmailFailure())),
        ),
      ),
    ),
  );
}
