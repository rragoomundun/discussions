import { createReducer, on } from '@ngrx/store';

import { ConfigState } from './config.state';

import * as ConfigActions from './config.actions';

export const initialState: ConfigState = {
  exists: false,
  onGetExists: 'false',
};

export const configReducer = createReducer(
  initialState,
  on(ConfigActions.getExists, (state) => ({
    ...state,
    onGetExists: 'true',
  })),
  on(ConfigActions.getExistsSuccess, (state, { exists }) => ({
    ...state,
    exists,
    onGetExists: 'success',
  })),
  on(ConfigActions.getExistsFailure, (state) => ({
    ...state,
    onGetExists: 'error',
  }))
);
