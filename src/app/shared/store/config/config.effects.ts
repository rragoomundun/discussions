import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, mergeMap, catchError, of, tap } from 'rxjs';

import * as ConfigActions from './config.actions';

import { Config as ConfigService } from '../../services/config/config';

@Injectable()
export class ConfigEffects {
  private actions$ = inject(Actions);
  private configService = inject(ConfigService);

  getExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.getExists),
      exhaustMap(() =>
        this.configService.getExists().pipe(
          map((response) =>
            ConfigActions.getExistsSuccess({ exists: response.exists })
          ),
          catchError(() => of(ConfigActions.getExistsFailure()))
        )
      )
    )
  );
}
