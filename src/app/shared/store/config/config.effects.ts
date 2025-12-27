import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of, tap } from 'rxjs';

import * as ConfigActions from './config.actions';

import { Config as ConfigService } from '../../services/config/config';

@Injectable()
export class ConfigEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private configService = inject(ConfigService);

  getExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.getExists),
      exhaustMap(() =>
        this.configService.getExists().pipe(
          map((response) =>
            ConfigActions.getExistsSuccess({ exists: response.exists }),
          ),
          catchError(() => of(ConfigActions.getExistsFailure())),
        ),
      ),
    ),
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.init),
      exhaustMap((data) =>
        this.configService.init(data).pipe(
          tap(() => {
            this.router.navigate(['/auth/register']);
          }),
          map(() => ConfigActions.initSuccess(data)),
          catchError(() => of(ConfigActions.initFailure())),
        ),
      ),
    ),
  );
}
