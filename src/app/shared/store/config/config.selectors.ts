import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

import { ConfigState } from './config.state';

export const selectConfig = (state: AppState) => state.config;

export const selectConfigConfigExists = createSelector(
  selectConfig,
  (state: ConfigState) => state.exists,
);

export const selectConfigModel = createSelector(
  selectConfig,
  (state: ConfigState) => state.config,
);

export const selectBottomLinks = createSelector(
  selectConfig,
  (state: ConfigState) => state.bottomLinks,
);

export const selectConfigOnGetExists = createSelector(
  selectConfig,
  (state: ConfigState) => state.onGetExists,
);

export const selectOnInit = createSelector(
  selectConfig,
  (state: ConfigState) => state.onInit,
);

export const selectOnGetConfig = createSelector(
  selectConfig,
  (state: ConfigState) => state.onGetConfig,
);

export const selectOnUpdateConfig = createSelector(
  selectConfig,
  (state: ConfigState) => state.onUpdateConfig,
);

export const selectOnUpdateBottomLinks = createSelector(
  selectConfig,
  (state: ConfigState) => state.onUpdateBottomLinks,
);
