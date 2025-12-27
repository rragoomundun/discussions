import { createReducer, on } from '@ngrx/store';

import { ConfigState } from './config.state';

import * as ConfigActions from './config.actions';

export const initialState: ConfigState = {
  exists: false,
  config: null,
  onGetExists: 'false',
  onInit: 'false',
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
  })),
  on(ConfigActions.init, (state) => ({
    ...state,
    onInit: 'true',
  })),
  on(ConfigActions.initSuccess, (state, { title, lang }) => ({
    ...state,
    exists: true,
    config: {
      title,
      lang,
      logo: '',
      description: '',
      meta: '',
      show_title: true,
      show_logo: false,
      created_at: new Date(),
    },
    onInit: 'success',
  })),
  on(ConfigActions.initFailure, (state) => ({
    ...state,
    onInit: 'error',
  })),
);
