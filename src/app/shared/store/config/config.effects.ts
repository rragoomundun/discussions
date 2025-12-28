import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of, tap } from 'rxjs';

import * as ConfigActions from './config.actions';

import { Config as ConfigService } from '../../services/config/config';

import { Config } from '../../models/Config';

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
            ConfigActions.getExistsSuccess({
              config: response.config,
              admin: response.admin,
            }),
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

  getConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.getConfig),
      exhaustMap(() =>
        this.configService.get().pipe(
          map((config: Config) => ConfigActions.getConfigSuccess({ config })),
          catchError(() => of(ConfigActions.getConfigFailure())),
        ),
      ),
    ),
  );
}
