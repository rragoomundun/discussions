import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideRouter } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { configReducer } from './shared/store/config/config.reducer';
import { ConfigEffects } from './shared/store/config/config.effects';

import { apiInterceptor } from './core/interceptors/api/api-interceptor';

import { routes } from './app.routes';

import { App } from './shared/services/app/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideRouter(routes),
    provideAppInitializer(() => {
      const appService = inject(App);
      appService.init();
    }),
    provideClientHydration(withEventReplay()),
    provideStore({ config: configReducer }),
    provideEffects([ConfigEffects]),
  ],
};
