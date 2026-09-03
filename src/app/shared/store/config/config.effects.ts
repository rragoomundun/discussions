import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, of, tap } from 'rxjs';

import * as ConfigActions from './config.actions';

import { Config as ConfigService } from '../../services/config/config';
import { App as AppService } from '../../services/app/app';

import { Config } from '../../models/Config';
import { BottomLink } from '../../models/BottomLink';

@Injectable()
export class ConfigEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private configService = inject(ConfigService);
  private appService = inject(AppService);

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
          map((data: { config: Config; bottomLinks: BottomLink[] }) =>
            ConfigActions.getConfigSuccess({
              config: data.config,
              bottomLinks: data.bottomLinks,
            }),
          ),
          catchError(() => of(ConfigActions.getConfigFailure())),
        ),
      ),
    ),
  );

  updateConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.updateConfig),
      exhaustMap((value) =>
        this.configService.update(value.config).pipe(
          tap(() => this.appService.setFavicon(value.config.favicon)),
          map(() =>
            ConfigActions.updateConfigSuccess({ config: value.config }),
          ),
          catchError(() => of(ConfigActions.updateConfigFailure())),
        ),
      ),
    ),
  );

  updateBottomLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.updateBottomLinks),
      exhaustMap((value) =>
        this.configService.updateBottomLinks(value.bottomLinks).pipe(
          map(() =>
            ConfigActions.updateBottomLinksSuccess({
              bottomLinks: value.bottomLinks,
            }),
          ),
          catchError(() => of(ConfigActions.updateBottomLinksFailure())),
        ),
      ),
    ),
  );
}
