import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of, tap } from 'rxjs';

import * as UserActions from './user.actions';

import { User as UserService } from '../../services/user/user';

import { User } from '../../models/User';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
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
}
