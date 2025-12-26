import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

import { ConfigState } from './config.state';

export const selectConfig = (state: AppState) => state.config;

export const selectConfigExists = createSelector(
  selectConfig,
  (state: ConfigState) => state.exists
);

export const selectConfigOnGetExists = createSelector(
  selectConfig,
  (state: ConfigState) => state.onGetExists
);
