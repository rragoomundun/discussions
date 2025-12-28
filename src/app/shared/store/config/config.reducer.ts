import { createReducer, on } from '@ngrx/store';

import { ConfigState } from './config.state';

import * as ConfigActions from './config.actions';

export const initialState: ConfigState = {
  exists: null,
  config: null,
  onGetExists: 'false',
  onInit: 'false',
  onGetConfig: 'false',
};

export const configReducer = createReducer(
  initialState,

  on(ConfigActions.getExists, (state) => ({
    ...state,
    onGetExists: 'true',
  })),
  on(ConfigActions.getExistsSuccess, (state, { config, admin }) => {
    return {
      ...state,
      exists: {
        config,
        admin,
      },
      onGetExists: 'success',
    };
  }),
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
    exists: {
      config: true,
      admin: false,
    },
    config: {
      title,
      lang,
      logo: '',
      favicon: '',
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

  on(ConfigActions.getConfig, (state) => ({
    ...state,
    onGetConfig: 'true',
  })),
  on(ConfigActions.getConfigSuccess, (state, { config }) => ({
    ...state,
    ...config,
    onGetConfig: 'success',
  })),
  on(ConfigActions.getConfigFailure, (state) => ({
    ...state,
    onGetConfig: 'error',
  })),
);
